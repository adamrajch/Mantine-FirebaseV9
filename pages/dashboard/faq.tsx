import { Container, Group, List, Text, ThemeIcon, Title } from '@mantine/core';
import React from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Layout from '../../components/dashboard/AppShell';

export default function FAQ(): JSX.Element {
  return (
    <Layout>
      <Container>
        <Title align="center">FAQ</Title>
        <Group direction="column" position="left">
          <Group direction="row" position="left">
            <ThemeIcon>
              <AiOutlineUnorderedList />
            </ThemeIcon>
            <Text>Table of Contents</Text>
          </Group>
          <List listStyleType="disc">
            <List.Item>First order item</List.Item>
            <List.Item>First order item</List.Item>
            <List.Item>
              First order item with list
              <List withPadding listStyleType="disc">
                <List.Item>Nested item</List.Item>
                <List.Item>Nested item</List.Item>

                <List.Item>Nested item</List.Item>
              </List>
            </List.Item>
            <List.Item>First order item</List.Item>
          </List>
        </Group>
      </Container>
    </Layout>
  );
}
