import { Button, Center, SimpleGrid, TextInput, Title } from '@mantine/core';
import React, { ReactElement, useState } from 'react';

export default function Login({}: any): ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function handleSubmit() {}
  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            border: '1px solid white',
            width: '30vw',
            padding: 25,
            borderRadius: 10,
            minHeight: '40vh',
          }}
        >
          <SimpleGrid cols={1}>
            <Title align="center">Login</Title>
            <TextInput
              type="email"
              label="email"
              required
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <TextInput
              type="password"
              label="password"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <Button variant="outline" type="submit">
              Submit
            </Button>
          </SimpleGrid>
        </div>
      </form>
    </Center>
  );
}
