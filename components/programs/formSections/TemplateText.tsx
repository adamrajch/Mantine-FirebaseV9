import { Button, Col, Grid, Group, Table, Text, Title, useMantineTheme } from '@mantine/core';
import React, { ReactElement, useState } from 'react';
import { FaRegStickyNote } from 'react-icons/fa';

export default function TemplateText({ values }: any): ReactElement {
  const theme = useMantineTheme();
  const [blockIndex, setBlockIndex] = useState(0);
  const [weekIndex, setWeekIndex] = useState(0);
  return (
    <Group direction="column" position="left" grow my={20}>
      {/* <Text style={{ color: 'white', fontSize: 20 }} my={0}>
        {values.title ? values.title : 'Program Title'}
      </Text> */}
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

      <Group spacing={6}>
        {values.blocks.map((block: any, i: number) => (
          <Button
            key={i}
            variant="outline"
            size="xs"
            onClick={() => {
              if (blockIndex == i) {
              } else {
                setWeekIndex(0), setBlockIndex(i);
              }
            }}
            sx={(theme) => ({
              borderColor: blockIndex == i ? 'gold' : '',
            })}
          >
            {block.name}
          </Button>
        ))}
      </Group>
      <Group spacing={6}>
        {values.blocks[blockIndex].weeks &&
          values.blocks[blockIndex].weeks.length > 0 &&
          values.blocks[blockIndex].weeks.map((week: any, i: number) => (
            <Button
              variant="outline"
              size="xs"
              sx={(theme) => ({
                borderColor: weekIndex == i ? 'gold' : '',
              })}
              onClick={() => {
                if (weekIndex == i) {
                } else {
                  setWeekIndex(i);
                }
              }}
            >
              {week.name}
            </Button>
          ))}
      </Group>
      {values.blocks[blockIndex] && (
        <Group direction="column" grow>
          <Title order={3}>{values.blocks[blockIndex].name}</Title>

          <Text>{values.blocks[blockIndex].summary}</Text>

          {values.blocks[blockIndex].weeks &&
          values.blocks[blockIndex].weeks[weekIndex] &&
          values.blocks[blockIndex].weeks.length > 0 ? (
            <Group
              direction="column"
              grow
              style={{ paddingLeft: 10, marginTop: 12, width: '100%' }}
            >
              {values.blocks[blockIndex].weeks[weekIndex].name &&
              values.blocks[blockIndex].weeks.name !== `Week ${weekIndex}` ? (
                <Title order={2} align="left">
                  {values.blocks[blockIndex].weeks[weekIndex].name}
                </Title>
              ) : null}

              <Grid justify="space-around">
                {values.blocks[blockIndex].weeks[weekIndex].days.length > 0 &&
                  values.blocks[blockIndex].weeks[weekIndex].days.map(
                    (day: any, dayIndex: number) => (
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
                          <Title order={3} align="center" style={{ color: theme.colors.dark[2] }}>
                            {day.name}
                          </Title>
                          {day.summary != undefined && day.summary.length > 0 && (
                            <Text size="sm">Summary: {day.summary}</Text>
                          )}

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
                              {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts
                                .length > 0 &&
                                values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts !==
                                  undefined &&
                                values.blocks[blockIndex].weeks[weekIndex].days[dayIndex].lifts.map(
                                  (l: any, liftIndex: number) => (
                                    <React.Fragment key={liftIndex}>
                                      {l.records.map((t: any, tIndex: number) => (
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
                                    </React.Fragment>
                                  )
                                )}
                            </tbody>
                          </Table>
                        </Group>
                      </Col>
                    )
                  )}
              </Grid>
            </Group>
          ) : null}
        </Group>
      )}
    </Group>
  );
}
