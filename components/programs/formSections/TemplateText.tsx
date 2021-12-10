import { Col, Grid, Group, Table, Text, Title, useMantineTheme } from '@mantine/core';
import React, { ReactElement } from 'react';
import { FaRegStickyNote } from 'react-icons/fa';

export default function TemplateText({ values }: any): ReactElement {
  const theme = useMantineTheme();
  return (
    <Group direction="column" position="left" grow>
      <Title align="left">{values.title ? values.title : 'Program Title'}</Title>
      <Group direction="column" position="left" spacing={0} grow>
        {values.category.length > 0 && (
          <Text mx={0}>
            {`Discipline: `}
            {values.category.map((e: string, i: number) => (
              <Text key={e} component="span" mx={2}>
                {e}
                {i < values.category.length - 1 && ','}
              </Text>
            ))}
          </Text>
        )}
        {values.experience.length > 0 && (
          <Text mx={0}>
            {`Level: `}
            {values.experience.map((e: string, i: number) => (
              <Text key={e} component="span" mx={2}>
                {e}
                {i < values.experience.length - 1 && ','}
              </Text>
            ))}
          </Text>
        )}

        {values.periodization.length > 0 && (
          <Text>
            {`Periodization: `}
            {values.periodization.map((x: string, i: number) => (
              <Text component="span" mx={2} key={x}>
                {x}
                {i < values.periodization.length - 1 && ','}
              </Text>
            ))}
          </Text>
        )}
      </Group>

      <Group direction="column" grow>
        {values.blocks.length &&
          values.blocks.map((block, blockIndex: number) => (
            <Group direction="column" grow key={blockIndex}>
              <Title order={3}>{block.name}</Title>
              <Group direction="column" grow>
                {values.blocks[blockIndex].weeks.length &&
                  values.blocks[blockIndex].weeks.map((week, weekIndex: number) => (
                    <Group
                      direction="column"
                      grow
                      style={{ paddingLeft: 10, marginTop: 12, width: '100%' }}
                      key={weekIndex}
                    >
                      <Title order={2} align="left">
                        {week.name}
                      </Title>
                      <Grid justify="space-around">
                        {values.blocks[blockIndex].weeks[weekIndex].days.length > 0 &&
                          values.blocks[blockIndex].weeks[weekIndex].days.map(
                            (day, dayIndex: number) => (
                              <Col span={12} lg={12} key={dayIndex}>
                                <Group
                                  direction="column"
                                  grow
                                  key={dayIndex}
                                  style={{
                                    border: '2px solid  ',
                                    borderRadius: 5,
                                    padding: '12px 24px',
                                    borderColor: theme.colors.dark[3],
                                  }}
                                >
                                  <Title
                                    order={3}
                                    align="center"
                                    style={{ color: theme.colors.dark[2] }}
                                  >
                                    {day.name}
                                  </Title>
                                  <Text size="sm">Summary: {day.summary}</Text>

                                  <Table highlightOnHover>
                                    <thead>
                                      <tr>
                                        <th>Movement</th>
                                        <th>Sets</th>
                                        <th>Reps</th>
                                        <th>RPE</th>
                                        <th>%</th>
                                        <th>Load</th>
                                        <th>Note</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex]
                                        .lifts.length > 0 &&
                                        values.blocks[blockIndex].weeks[weekIndex].days[dayIndex]
                                          .lifts !== undefined &&
                                        values.blocks[blockIndex].weeks[weekIndex].days[
                                          dayIndex
                                        ].lifts.map((l, liftIndex: number) => (
                                          <>
                                            {l.records.map((t, tIndex) => (
                                              <tr key={tIndex}>
                                                <td>{tIndex == 0 && l.name}</td>
                                                <td>{t.sets}</td>
                                                <td>{t.reps}</td>
                                                <td>{t.rpe}</td>
                                                <td>{t.percent}</td>
                                                <td>{t.load}</td>
                                                <td>
                                                  {tIndex == 0 && l.note && (
                                                    <FaRegStickyNote color="yellow" />
                                                  )}
                                                </td>
                                              </tr>
                                            ))}
                                          </>
                                        ))}
                                    </tbody>
                                  </Table>
                                </Group>
                              </Col>
                            )
                          )}
                      </Grid>
                    </Group>
                  ))}
              </Group>
            </Group>
          ))}
      </Group>
    </Group>
  );
}
