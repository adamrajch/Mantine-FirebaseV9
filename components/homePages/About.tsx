import { Box, Button, Container, Grid, Group, Image, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillBook, AiFillEdit, AiFillLike, AiFillTrophy } from 'react-icons/ai';

type Props = {};

export default function About({}: Props) {
  const router = useRouter();
  return (
    <Container size="md">
      <Title align="center" my={25}>
        Your All-In-One Trainer
      </Title>
      <Text my={25} align="center">
        Periodize brings all the features you need to fully maximize your fitness performance
      </Text>
      <Grid grow style={{ color: 'white' }}>
        <Grid.Col span={12} md={6}>
          <Box
            sx={{
              backgroundColor: '#48b2f8',
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Group position="apart" noWrap>
              <div
                style={{
                  alignSelf: 'flex-start',
                }}
              >
                <AiFillEdit />
              </div>

              <Group direction="column" grow style={{ flexGrow: 1, paddingLeft: 8 }}>
                <Text color="black" weight={600}>
                  Create The Perfect Program
                </Text>
                <Text color="black" size="md">
                  Build a routine geared to your goals and preferences. Plan for the weeks and
                  months ahead with sound theory
                </Text>
              </Group>
            </Group>
          </Box>
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <Box
            sx={{
              backgroundColor: '#1d91df',
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Group position="apart" noWrap>
              <div
                style={{
                  alignSelf: 'flex-start',
                }}
              >
                <AiFillLike />
              </div>

              <Group direction="column" grow style={{ flexGrow: 1, paddingLeft: 8 }}>
                <Text color="black" weight={600}>
                  Subscribe
                </Text>
                <Text color="black" size="md">
                  Subscribe to various training programs to build a well rounded system, or find one
                  that suits all your goals and needs!
                </Text>
              </Group>
            </Group>
          </Box>
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <Box
            sx={{
              backgroundColor: '#1784cc',
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Group position="apart" noWrap>
              <div
                style={{
                  alignSelf: 'flex-start',
                }}
              >
                <AiFillBook />
              </div>

              <Group direction="column" grow style={{ flexGrow: 1, paddingLeft: 8 }}>
                <Text color="black" weight={600}>
                  Log Progress
                </Text>
                <Text color="black" size="md">
                  Keep track of your progress in the gym and analyze your progression of your
                  individual lifts
                </Text>
              </Group>
            </Group>
          </Box>
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <Box
            sx={{
              backgroundColor: '#0279c8',
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Group position="apart" noWrap>
              <div
                style={{
                  alignSelf: 'flex-start',
                }}
              >
                <AiFillTrophy />
              </div>

              <Group direction="column" grow style={{ flexGrow: 1, paddingLeft: 8 }}>
                <Text color="black" weight={600}>
                  Acquire gains
                </Text>
                <Text color="black" size="md">
                  Being on a sound training program is one of the most imortant ways to progress in
                  your fitness jouney. Happy training!
                </Text>
              </Group>
            </Group>
          </Box>
        </Grid.Col>
      </Grid>
      <Group grow my={25}>
        <Image src="fitnesspic.svg" height={200} fit="contain" />
        <Box>
          <Title order={4} align="center" my={25}>
            New to the gym or starting again?
          </Title>
          <Group position="center" my={25}>
            <Button variant="outline" onClick={() => router.push('/basics')}>
              Learn The Basics
            </Button>
          </Group>
        </Box>
      </Group>
    </Container>
  );
}
