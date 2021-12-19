import { Group, Loader, Text } from '@mantine/core';
import dayjs from 'dayjs';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';
import { db } from '../../../firebase';
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
  preFetchedComments,
}: any): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Array<any>>([]);

  useEffect(() => {
    if (!preFetchedComments) {
      getComments();
    } else {
      setComments(preFetchedComments);
      setLoading(false);
    }

    return;
  }, []);

  async function getComments() {
    console.log('fetching');
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
  return (
    <div>
      {loading && !preFetchedComments && <Loader />}
      {!comments.length && <div>No comments</div>}
      <div>
        {!!(comments.length > 0) && !loading && (
          <Group position="left" direction="column" grow>
            {comments.map((c) => (
              <Group position="apart" key={c.id}>
                <Group position="left" direction="column" spacing={0}>
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
                    {/* <Text size="xs" color="gray">
                      Pinned
                    </Text> */}
                    {/* <Text size="xs" color="gray">
                      166 likes
                    </Text> */}
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
                    {/* {c.data.user === user.name && (
                      <Text
                        onClick={() => deleteComment(c.id)}
                        size="xs"
                        color="gray"
                        style={{ cursor: 'pointer' }}
                      >
                        {c.data.pinned ? 'Unpin' : 'Pin'}
                      </Text>
                    )} */}
                  </Group>
                </Group>

                {/* <ActionIcon onClick={() => likeComment(c.id)}>
                  <AiOutlineHeart />
                </ActionIcon> */}
              </Group>
            ))}
          </Group>
        )}
      </div>
    </div>
  );
}
