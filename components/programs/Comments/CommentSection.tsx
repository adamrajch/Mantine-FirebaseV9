import { ActionIcon, Group, Text, Title } from '@mantine/core';
import { ChevronDownIcon, ChevronUpIcon } from '@modulz/radix-icons';
import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentsList from './Comments';

export default function CommentSection({
  programID,
  user,
  programAuthor,
  preFetchedComments,
}: any): JSX.Element {
  const [open, setOpen] = useState(true);
  return (
    <Group position="left" direction="column" grow>
      <Group position="apart">
        <Title order={2}>Comments</Title>
        <ActionIcon onClick={() => setOpen(!open)}>
          {open ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </ActionIcon>
      </Group>

      {user && open && <Text>Write Comment as {user.name}</Text>}
      {user && open && <CommentForm programID={programID} user={user} />}
      {open && (
        <CommentsList
          programID={programID}
          user={user}
          programAuthor={programAuthor}
          preFetchedComments={preFetchedComments}
        />
      )}
    </Group>
  );
}
