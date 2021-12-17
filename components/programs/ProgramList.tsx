import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Center,
  Divider,
  Group,
  Menu,
  Text,
  Title,
} from '@mantine/core';
import { TrashIcon } from '@modulz/radix-icons';
import dayjs from 'dayjs';
import { deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import { default as router, default as Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { db } from '../../firebase';
import { ErrorImage } from './ImageError';
export default function ProgramList({ programsProps }: any): JSX.Element {
  const [programs, setPrograms] = useState<any>([]);
  console.log(programsProps);
  useEffect(() => {
    setPrograms(programsProps.sort((a: any, b: any) => b.updated - a.updated));
  }, []);

  async function deleteProgram(id: string, e: any) {
    e.stopPropagation();
    await deleteDoc(doc(db, 'programs', id));
    Router.reload();
  }
  return (
    <>
      {programs.length > 0 ? (
        <Group direction="column" position="apart" spacing={12}>
          {programs.map((p: any) => (
            <Box
              onClick={() => router.push(`/programs/${p.id}`)}
              key={p.id}
              sx={(theme) => ({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minWidth: 500,
                width: '100%',
                border: '2px solid gray',
                padding: 6,
                borderRadius: 8,
                borderColor: theme.colors.gray[8],
                cursor: 'pointer',
                zIndex: 10,
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[5],
                },
              })}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <ErrorImage src={p.photoUrl} height={80} width={80} />
                <Group direction="column" position="left" spacing={0}>
                  <Anchor href={`/programs/${p.id}`} component={Link}>
                    <Text size="xl" style={{ cursor: 'pointer' }}>
                      {p.title}
                    </Text>
                  </Anchor>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Text size="sm">Created: {dayjs(p.created).format('MM/DD/YYYY')}</Text>
                    {p.updated !== p.created ? (
                      <Text size="sm">Last Updated: {dayjs(p.updated).format('MM/DD/YYYY')}</Text>
                    ) : null}
                  </div>
                </Group>
              </div>

              <Menu
                zIndex={10000}
                control={
                  <ActionIcon>
                    <BsThreeDotsVertical />
                  </ActionIcon>
                }
              >
                <Menu.Item
                  icon={<AiOutlineEdit />}
                  onClick={() => router.push(`/programs/${p.id}`)}
                >
                  Edit
                </Menu.Item>
                <Divider />

                <Menu.Item
                  color="red"
                  icon={<TrashIcon />}
                  onClick={(e: any) => deleteProgram(p.id, e)}
                >
                  Delete Program
                </Menu.Item>
              </Menu>
            </Box>
          ))}
        </Group>
      ) : (
        <Center style={{ height: '60vh', width: '100%' }}>
          <Group direction="column" grow>
            <Title order={3} align="center" my={20}>
              You haven't made any programs yet!
            </Title>
            <Link href="/basics">
              <Button variant="outline" fullWidth>
                Learn
              </Button>
            </Link>

            <Link href="/dashboard/create">
              <Button variant="filled" fullWidth color="cyan">
                Create A Program
              </Button>
            </Link>
          </Group>
        </Center>
      )}
    </>
  );
}
