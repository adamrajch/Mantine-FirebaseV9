import { Group, Select } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const links = [
  {
    href: '/programs/category/featured',
    title: 'Featured',
  },
  {
    href: '/programs/category/powerlifting',
    title: 'Powerlifting',
  },
  {
    href: '/programs/category/bodybuilding',
    title: 'Bodybuilding',
  },
  {
    href: '/programs/category/weightlifting',
    title: 'Weightlifting',
  },
  {
    href: '/programs/category/sport',
    title: 'Sport',
  },
  {
    href: '/programs/category/mobility',
    title: 'Mobility',
  },
];
const expLinks = [
  {
    href: '/programs/exp/beginner',
    title: 'Beginner',
  },
  {
    href: '/programs/exp/intermediate',
    title: 'Intermediate',
  },
  {
    href: '/programs/exp/advanced',
    title: 'Advanced',
  },
];
const data = links.map((l: any) => {
  return {
    href: l.href,
    title: l.title,
    value: l.title,
    label: l.title,
  };
});
export default function ProgramsNav(): JSX.Element {
  const [val, setVal] = useState<any>(null);

  const router = useRouter();

  // useEffect(() => {
  //   if (val) {
  //     const selected = data.find((l: any) => {
  //       return l.value == val;
  //     });
  //     router.push(selected?.href);
  //   }
  // }, [val]);
  return (
    <Group position="left" my={20} spacing={2}>
      <Select
        placeholder="Search Category"
        maxDropdownHeight={200}
        icon={<BiSearch />}
        data={data}
        onChange={(q) => {
          let selected = data.find((item: any) => item.value === q);
          if (q === null) {
          }

          if (selected?.href) {
            router.push(selected.href);
          }
        }}
      />
      {/* {links.map((link) => (
        <Link href={link.href} key={link.href}>
          <Text
            component="a"
            sx={(theme) => ({
              borderBottom: '1px solid transparent',
              padding: '4px 8px',
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.colors.gray[6],
                color: theme.colors.cyan[6],
              },
            })}
          >
            {link.title}
          </Text>
        </Link>
      ))} */}
      {/* <Menu
        control={
          <Text
            sx={(theme) => ({
              borderBottom: '1px solid transparent',
              padding: '4px 8px',
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.colors.gray[6],
                color: theme.colors.cyan[6],
              },
            })}
          >
            Experience{' '}
          </Text>
        }
      >
        {expLinks.map((exp) => (
          <Menu.Item
            key={exp.href}
            onClick={() => router.push(exp.href)}
            sx={(theme) => ({
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.colors.gray[6],
                color: theme.colors.cyan[6],
              },
            })}
          >
            {exp.title}
          </Menu.Item>
        ))}
      </Menu> */}
    </Group>
  );
}
