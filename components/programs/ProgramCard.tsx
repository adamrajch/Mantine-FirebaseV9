import { Badge, Box, Card, Group, Text, ThemeIcon, useMantineColorScheme } from '@mantine/core';
import { arrayRemove, arrayUnion, doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import router from 'next/router';
import React, { ReactElement } from 'react';
import { AiOutlineTrophy } from 'react-icons/ai';
import { useAuth } from '../../context/auth';
import { db } from '../../firebase';
import { handleCatColor, handleExpColor, handlePColor } from '../../utils/ColorHelper';

export default function ProgramCard({ program, id }: any): ReactElement {
  const colorScheme = useMantineColorScheme();
  const p = program;
  const { user, loading } = useAuth();
  const colors = colorScheme.colorScheme;

  async function likeProgram() {
    if (user.likedPrograms.includes(p.id)) {
      try {
        await setDoc(
          doc(db, 'users', user.uid),
          {
            likedPrograms: arrayRemove(p.id),
          },
          { merge: true }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await setDoc(
          doc(db, 'users', user.uid),
          {
            likedPrograms: arrayUnion(p.id),
          },
          { merge: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <Box
      onClick={() => router.push(`/programs/${id}`)}
      sx={(theme) => ({
        cursor: 'pointer',
        borderRadius: theme.radius.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.dark[1],
        boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 6px #1b3742',
        '&:hover': {
          boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 6px #14698b',
        },
      })}
    >
      <Card
        padding="md"
        shadow="md"
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.dark[1],
          boxShadow: '6px 6px  14px   #0f0f0f, -2px -2px 2px #1b3742',
          '&:hover': {
            boxShadow: '6px 6px 14px  #0f0f0f, -2px -2px 2px #14698b',
          },
        })}
      >
        {/* <Card.Section>
          <ErrorImage src={p.photoUrl} height={180} />
        </Card.Section> */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 5 }}>
          <Group position="apart" noWrap spacing={0} style={{ padding: 0 }}>
            <Link href={`/programs/${id}`}>
              <Text style={{ cursor: 'pointer', color: 'white', fontSize: 20 }} my={0}>
                {p.title}
              </Text>
            </Link>
            {p.featured ? (
              <ThemeIcon variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                <AiOutlineTrophy />
              </ThemeIcon>
            ) : null}
          </Group>

          {/* <Link href={`/dashboard/users/${p.author?.uid}`}> */}
          <Text size="sm" color="cyan" style={{ cursor: 'pointer' }}>
            <Text component="span" color="dimmed">
              Author:{' '}
            </Text>
            {p.author?.name ? p.author.name : p.author.email}
          </Text>
          {/* </Link> */}

          <Group position="left" noWrap spacing={4}>
            {p.template.experience.map((e: string, i: number) => {
              return (
                <Badge color={handleExpColor(e)} size="xs" key={e}>
                  {e}
                </Badge>
              );
            })}
          </Group>

          <Group position="left" spacing={4}>
            {p.template.category.sort().map((e: string, i: number) => {
              return (
                <Badge variant="filled" color={handleCatColor(e)} size="xs" radius={2} key={e}>
                  {e}
                </Badge>
              );
            })}
          </Group>
          <Group position="left" noWrap spacing={4}>
            {p.template.periodization.sort().map((e: string, i: number) => (
              <Badge variant="outline" color={handlePColor(e)} size="xs" radius={2} key={e}>
                {e}
              </Badge>
            ))}
          </Group>
          {/* <Group position="left" style={{ flex: '1 0 auto' }}>
            <Text size="xs">Likes</Text>
            <Text size="xs">
              {p.commentCount} {p.commentCount === 1 ? 'Comment' : 'Comments'}
            </Text>
            {user && (
              <ActionIcon
                style={{ zIndex: 10 }}
                onClick={(e: any) => {
                  e.stopPropagation();
                  likeProgram();
                }}
              >
                {user.likedPrograms.includes(p.id) ? (
                  <AiFillHeart color="red" />
                ) : (
                  <AiOutlineHeart />
                )}
              </ActionIcon>
            )}
          </Group> */}
        </div>
      </Card>
    </Box>
  );
}
