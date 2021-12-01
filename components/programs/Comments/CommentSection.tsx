import { Group, Text, Title } from '@mantine/core';
import React from 'react';
import CommentForm from './CommentForm';
import CommentsList from './Comments';

export default function CommentSection({ programID, user, programAuthor }: any): JSX.Element {
  return (
    <Group position="left" direction="column" grow>
      <Title order={2}>Comments</Title>
      <Text>Write Comment as {user.displayName}</Text>
      {user && <CommentForm programID={programID} user={user} />}

      <CommentsList programID={programID} user={user} programAuthor={programAuthor} />
    </Group>
  );
}
