import { ActionIcon, Anchor, Box, Divider, Group, Menu, Text } from '@mantine/core';
import { GearIcon, PinRightIcon, TrashIcon } from '@modulz/radix-icons';
import dayjs from 'dayjs';
import { deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { db } from '../../firebase';

export default function ProgramList({ programsProps }): JSX.Element {
  const [programs, setPrograms] = useState<any>([]);
  console.log(programsProps);
  useEffect(() => {
    setPrograms(programsProps.sort((a, b) => b.updated - a.updated));
  }, []);

  async function deleteProgram(id, e) {
    e.stopPropagation();
    await deleteDoc(doc(db, 'programs', id));
  }
  return (
    <Group direction="column" position="apart" grow>
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
                <Text size="lg" style={{ cursor: 'pointer' }}>
                  {p.template.title}
                </Text>
              </Anchor>
              <Group position="left">
                <Text size="sm">Created: {dayjs(p.created).format('MMMM DD YYYY')}</Text>
                {p.updated !== p.created ? (
                  <Text size="sm">Last Updated: {dayjs(p.updated).format('MMMM DD YYYY')}</Text>
                ) : null}
              </Group>
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
