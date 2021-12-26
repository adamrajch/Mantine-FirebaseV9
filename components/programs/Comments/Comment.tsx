import { Button, Collapse, Group, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import { db } from '../../../firebase';

export default function Comment({ comment, user, programID }: any): ReactElement {
  const [open, setOpen] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [replies, setReplies] = useState<any>([]);
  const notifications = useNotifications();

  const c = comment;
  const form = useForm({
    initialValues: {
      comment: '',
    },

    validationRules: {
      comment: (value) => value.trim().length < 500,
    },
  });

  async function deleteComment(id: string) {
    await deleteDoc(doc(db, 'comments', id));
  }
  async function likeComment(commentId: string) {
    await setDoc(doc(db, 'commentHearts', `${user.uid}_${commentId}`), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    });
  }

  async function handleSubmit(comment: any, commentId: string) {
    console.log(user.uid, user.name, programID, commentId, comment);
    try {
      setReplyLoading(true);
      await addDoc(collection(db, 'comments'), {
        user: user.uid,
        name: user.name ? user.name : user.email,
        programID: programID,
        comment: comment,
        parent: commentId,
        createdDate: serverTimestamp(),
      });
      notifications.showNotification({
        title: 'Reply posted',
        message: `Successfully replied!`,
      });
      form.reset();
      setReplyLoading(false);
    } catch (error) {
      setReplyLoading(false);
      console.log('from comment : ', error);
    }

    setOpen(false);
  }

  useEffect(() => {
    fetchReplies();
    return;
  }, []);

  async function fetchReplies() {
    const q = query(
      collection(db, 'comments'),
      where('programID', '==', programID),
      where('parent', '==', comment.id),
      orderBy('createdDate', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setReplies(
        querySnapshot.docs.map((d) => {
          const docObj = {
            id: d.id,
            data: d.data(),
          };
          return docObj;
        })
      );
    });

    return unsubscribe;
  }
  useEffect(() => {
    console.log('replies : ', replies);
  }, [replies]);
  return (
    <Group direction="column" key={c.id} grow>
      <Group direction="column" spacing={0} grow>
        <Group position="left">
          <Text size="sm" weight={700} color="cyan">
            {c.data.name}
          </Text>
          <Text key={c.id}>{c.data.comment}</Text>
        </Group>
        <Group position="left">
          <Text size="xs">
            {dayjs(c.data.createdDate?.toDate().getTime()).format('MM/DD/YYYY')}
          </Text>

          <Text size="xs" color="gray" style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
            Reply
          </Text>
          {c.data.user === user.uid && (
            <Text
              onClick={() => deleteComment(c.id)}
              size="xs"
              color="gray"
              style={{ cursor: 'pointer' }}
            >
              Delete
            </Text>
          )}
        </Group>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values.comment, c.id))}>
          <Collapse in={open}>
            <Group position="left" direction="column" grow>
              <Textarea
                name="comment"
                placeholder={`Reply to ${c.data.name}`}
                value={form.values.comment}
                onChange={(value) => form.setFieldValue('comment', value.currentTarget.value)}
                error={form.errors.comment}
              />

              <Group position="right">
                <Button size="xs" color="dark" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button size="xs" variant="outline" type="submit" loading={replyLoading}>
                  Save
                </Button>
              </Group>
            </Group>
          </Collapse>
        </form>
        <div>
          {replies.map((reply: any) => (
            <div>
              <Group direction="column" spacing={0} grow ml={32}>
                <Group position="left">
                  <Text size="sm" weight={700} color="cyan">
                    {reply.data.name}
                  </Text>
                  <Text key={reply.id} size="xs">
                    {reply.data.comment}
                  </Text>
                </Group>
                <Group position="left">
                  <Text size="xs">
                    {dayjs(reply.data.createdDate?.toDate().getTime()).format('MM/DD/YYYY')}
                  </Text>

                  {/* <Text
                    size="xs"
                    color="gray"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpen(!open)}
                  >
                    Reply
                  </Text> */}
                  {reply.data.user === user.uid && (
                    <Text
                      onClick={() => deleteComment(reply.id)}
                      size="xs"
                      color="gray"
                      style={{ cursor: 'pointer' }}
                    >
                      Delete
                    </Text>
                  )}
                </Group>
              </Group>
            </div>
          ))}
        </div>
      </Group>

      {/* <ActionIcon onClick={() => likeComment(c.id)}>
                  <AiOutlineHeart />
                </ActionIcon> */}
    </Group>
  );
}
