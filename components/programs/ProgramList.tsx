import {
  ActionIcon,
  Anchor,
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
        <Group direction="column" position="apart" spacing={12} grow>
          {programs.map((p: any) => (
            <Group
              grow
              position="apart"
              key={p.id}
              sx={(theme) => ({
                padding: 8,
                borderRadius: theme.radius.md,
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.dark[1],
                boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
                '&:hover': {
                  boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
                },
              })}
            >
              <Group direction="column" position="left" spacing={0}>
                <Anchor href={`/programs/${p.id}`} component={Link}>
                  <Text
                    size="xl"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#14b8f8',
                        textDecoration: 'underline',
                      },
                    }}
                  >
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
              <Group position="right">
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
              </Group>
            </Group>
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
