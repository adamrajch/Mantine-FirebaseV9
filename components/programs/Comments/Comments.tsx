import { Group } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { ReactElement, useState } from 'react';
import { db } from '../../../firebase';
import Comment from './Comment';
interface Props {
  programID: string;
}
type Comment = {
  postID: string;
  userID: string;
  comment: string;
};
export default function CommentsList({
  programID,
  user,
  programAuthor,
  comments,
}: any): ReactElement {
  // const [comments, setComments] = useState<Array<any>>([]);
  const [open, setOpen] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const notifications = useNotifications();
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

  return (
    <div>
      {/* {!comments && <Loader />} */}
      {!comments.length && <div>No comments</div>}
      <div>
        {!!(comments.length > 0) && (
          <Group position="left" direction="column" grow>
            {comments.map((c: any) => (
              <Comment comment={c} user={user} programID={programID} />
            ))}
          </Group>
        )}
      </div>
    </div>
  );
}
