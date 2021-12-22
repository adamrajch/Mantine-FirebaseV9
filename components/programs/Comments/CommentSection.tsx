import { ActionIcon, Group, Menu, Text } from '@mantine/core';
import { ChevronDownIcon, ChevronUpIcon } from '@modulz/radix-icons';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { MdSort } from 'react-icons/md';
import { db } from '../../../firebase';
import CommentForm from './CommentForm';
import CommentsList from './Comments';
export default function CommentSection({
  programID,
  user,
  programAuthor,

  commentCount,
}: any): JSX.Element {
  const [open, setOpen] = useState(true);
  const [comments, setComments] = useState<any>([]);

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
      where('parentID', '==', null),
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

    return unsubscribe;
  }
  return (
    <Group position="left" direction="column" grow>
      <Group position="apart">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text>
            {comments.length} {commentCount.length === 1 ? 'Comment' : 'Comments'}{' '}
          </Text>

          <Menu
            control={
              <ActionIcon>
                <MdSort color="cyan" />
              </ActionIcon>
            }
            zIndex={1200}
          >
            <Menu.Label>Sort By</Menu.Label>
            <Menu.Item
              onClick={() => {
                console.log('nani');
              }}
            >
              Top Comments
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                console.log('nani');
              }}
            >
              Newest First
            </Menu.Item>
          </Menu>
        </div>

        <ActionIcon onClick={() => setOpen(!open)}>
          {open ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </ActionIcon>
      </Group>

      {user && open && <CommentForm programID={programID} user={user} />}

      <CommentsList
        programID={programID}
        user={user}
        programAuthor={programAuthor}
        comments={comments}
      />
    </Group>
  );
}
