import { collection, deleteDoc, onSnapshot, query } from '@firebase/firestore';
import { ActionIcon, Box, Container, Divider, Group, Menu, Text } from '@mantine/core';
import { GearIcon, PinRightIcon, TrashIcon } from '@modulz/radix-icons';
import { doc, orderBy, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Layout from '../../components/dashboard/AppShell';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
export default function MyPrograms(): JSX.Element {
  const [programs, setPrograms] = useState<any>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const collectionRef = collection(db, 'programs');

    const q = query(
      collectionRef,
      where('email', '==', currentUser?.email),
      orderBy('createdDate', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPrograms(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().createdDate?.toDate().getTime(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log(programs);
  }, [programs]);

  async function deleteProgram(id) {
    await deleteDoc(doc(db, 'programs', id));
  }
  return (
    <Layout>
      <Container>
        My Programs
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {programs.map((p) => {
            return (
              <Box
                key={p.id}
                sx={(theme) => ({
                  width: '100%',
                  border: '2px solid gray',
                  paddingLeft: 8,
                  paddingBottom: 4,
                  marginTop: 2,
                  marginBottom: 2,
                  borderRadius: 8,
                  borderColor: theme.colors.gray[8],
                  '&:hover': {
                    backgroundColor:
                      theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[5],
                  },
                })}
              >
                <Group position="apart">
                  <Group direction="column" position="center">
                    <Text component="a" href={`dashboard/programs/${p.id}`}>
                      {p.template.title}
                    </Text>
                    <Text>Created: {p.timestamp}</Text>
                  </Group>

                  <Group position="right">
                    <ActionIcon component="a" _target="blank" href={`/programs/${p.id}`}>
                      <AiOutlineEdit />
                    </ActionIcon>

                    <Menu
                      control={
                        <ActionIcon>
                          <BsThreeDotsVertical />
                        </ActionIcon>
                      }
                    >
                      <Menu.Label>Application</Menu.Label>
                      <Menu.Item icon={<GearIcon />}>Settings</Menu.Item>
                      <Divider />
                      <Menu.Label>Danger zone</Menu.Label>
                      <Menu.Item icon={<PinRightIcon />}>Archive</Menu.Item>,
                      <Menu.Item
                        color="red"
                        icon={<TrashIcon />}
                        onClick={() => deleteProgram(p.id)}
                      >
                        Delete Program
                      </Menu.Item>
                    </Menu>
                  </Group>
                </Group>
              </Box>
            );
          })}
        </div>
      </Container>
    </Layout>
  );
}
