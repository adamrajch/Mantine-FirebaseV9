import { ActionIcon, Group, Loader, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import dayjs from 'dayjs';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { db } from '../../../firebase';
interface Props {
  programID: string;
}
type Comment = {
  postID: string;
  userID: string;
  comment: string;
};
export default function CommentsList({ programID, user, programAuthor }: any): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Array<any>>([]);
  const [opened, setOpened] = useState(false);
  const modals = useModals();
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your comment',
      children: <Text size="sm">Are you sure you want to delete your comment?</Text>,
      labels: { confirm: 'Delete', cancel: 'Sike!' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  const collectionRef = collection(db, 'comments');
  const q = query(
    collectionRef,
    where('programID', '==', programID),
    orderBy('createdDate', 'asc')
  );
  useEffect(() => {
    getComments();
    return;
  }, []);
  useEffect(() => {
    console.log('comments : ', comments);
  }, [comments]);
  async function getComments() {
    const q = query(
      collection(db, 'comments'),
      where('programID', '==', programID),
      orderBy('createdDate', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setComments(
        querySnapshot.docs.map((d) => {
          const docObj = {
            id: d.id,
            data: d.data(),
          };
          return docObj;
        })
      );
    });

    setLoading(false);
    return unsubscribe;
  }
  async function deleteComment() {}
  async function likeComment() {}
  return (
    <div>
      {loading && <Loader />}
      {!comments.length && <div>No comments</div>}
      <div>
        {!!(comments.length > 0) && !loading && (
          <Group position="left" direction="column" grow>
            {comments.map((c) => (
              <Group position="apart" key={c.id}>
                <Group position="left" direction="column" spacing={0}>
                  <Group position="left">
                    <Text weight={700}>{c.data.user}</Text>
                    <Text key={c.id}>{c.data.comment}</Text>
                  </Group>
                  <Group position="left">
                    <Text size="xs">
                      {dayjs(c.data.createdDate?.toDate().getTime()).format('MMMM DD YYYY')}
                    </Text>
                    <Text size="xs" color="gray">
                      Pinned
                    </Text>
                    <Text size="xs" color="gray">
                      166 likes
                    </Text>
                    {c.data.user === user.email ||
                      (user.email === programAuthor && (
                        <Text
                          onClick={openDeleteModal}
                          size="xs"
                          color="gray"
                          style={{ cursor: 'pointer' }}
                        >
                          Delete
                        </Text>
                      ))}
                  </Group>
                </Group>

                <ActionIcon onClick={() => likeComment()}>
                  <AiOutlineHeart />
                </ActionIcon>
              </Group>
            ))}
          </Group>
        )}
      </div>
    </div>
  );
}
