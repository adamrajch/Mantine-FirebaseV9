import { ActionIcon, Anchor, Box, Divider, Group, Menu, Text } from '@mantine/core';
import { GearIcon, PinRightIcon, TrashIcon } from '@modulz/radix-icons';
import dayjs from 'dayjs';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';

export default function ProgramList({ programsProps }): JSX.Element {
  const [programs, setPrograms] = useState<any>([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    setPrograms(JSON.parse(programsProps));
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, 'programs');
    const q = query(
      collectionRef,
      where('email', '==', currentUser.email),
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

  async function deleteProgram(id, e) {
    e.stopPropagation();
    await deleteDoc(doc(db, 'programs', id));
  }
  return (
    <Group direction="column">
      {programs.map((p) => (
        <Box
          key={p.id}
          sx={(theme) => ({
            width: '100%',
            border: '2px solid gray',
            padding: 12,
            borderRadius: 8,
            borderColor: theme.colors.gray[8],
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[5],
            },
          })}
        >
          <Group position="apart">
            <Group direction="column" position="left" spacing={0}>
              <Anchor href={`/programs/${p.id}`} component={Link}>
                <Text size="lg">{p.template.title}</Text>
              </Anchor>

              <Text size="sm">Created: {dayjs(p.timestamp).format('MMMM DD YYYY')}</Text>
            </Group>

            <Group position="right">
              <Link href={`/programs/${p.id}`}>
                <ActionIcon>
                  <AiOutlineEdit />
                </ActionIcon>
              </Link>

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
                <Menu.Item color="red" icon={<TrashIcon />} onClick={(e) => deleteProgram(p.id, e)}>
                  Delete Program
                </Menu.Item>
              </Menu>
            </Group>
          </Group>
        </Box>
      ))}
    </Group>
  );
}
