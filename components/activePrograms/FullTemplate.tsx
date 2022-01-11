import {
  ActionIcon,
  Button,
  Center,
  Col,
  Grid,
  Group,
  Table,
  Tabs,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import React, { ReactElement } from 'react';
import { BiNote } from 'react-icons/bi';
import { FaRegStickyNote } from 'react-icons/fa';

export default function FullTemplate({ blocks }: any): ReactElement {
  const theme = useMantineTheme();

  const modals = useModals();

  const summaryModal = (title: string, summary: string) => {
    const id = modals.openModal({
      title: `${title} Summary`,
      children: <>{summary}</>,
    });
  };

  const calcTotalSets = (b: number, w: number, d: number) => {
    let sum = 0;
    for (let i = 0; i < blocks[b].weeks[w].days[d].lifts.length; i++) {
      for (let j = 0; j < blocks[b].weeks[w].days[d].lifts[i].records.length; j++) {
        sum = sum + blocks[b].weeks[w].days[d].lifts[i].records[j].sets;
      }
    }
    return sum;
  };
  const calcTotalReps = (b: number, w: number, d: number) => {
    let sum = 0;
    for (let i = 0; i < blocks[b].weeks[w].days[d].lifts.length; i++) {
      for (let j = 0; j < blocks[b].weeks[w].days[d].lifts[i].records.length; j++) {
        sum =
          sum +
          blocks[b].weeks[w].days[d].lifts[i].records[j].reps *
            blocks[b].weeks[w].days[d].lifts[i].records[j].sets;
      }
    }
    return sum;
  };
  return (
    <Group direction="column" position="left" grow my={20}>
      <Title order={2} align="center">
        Full Program
      </Title>
      <Tabs variant="outline">
        {blocks.map((block: any, i: number) => (
          <Tabs.Tab key={i} label={block.name}>
            <Tabs variant="pills">
              {blocks[i].weeks &&
                blocks[i].weeks.length > 0 &&
                blocks[i].weeks.map((week: any, w: number) => (
                  <Tabs.Tab key={w} label={week.name}>
                    <Group position="right">
                      {week.summary.length > 0 && (
                        <Button
                          onClick={() => summaryModal('Week', week.summary)}
                          size="xs"
                          variant="outline"
                        >
                          Week Summary
                        </Button>
                      )}
                      {block.summary.length > 0 && (
                        <Button
                          onClick={() => summaryModal('Block', block.summary)}
                          size="xs"
                          variant="outline"
                        >
                          Block Summary
                        </Button>
                      )}
                    </Group>
                    <Group direction="column" grow style={{ marginTop: 12, width: '100%' }}>
                      <Grid justify="space-around">
                        {blocks[i].weeks[w].days.length > 0 &&
                          blocks[i].weeks[w].days.map((day: any, dayIndex: number) => (
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
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 8,
                                  }}
                                >
                                  <Text size="sm">{`W${w + 1}D${dayIndex + 1}`}</Text>
                                  <Title
                                    order={3}
                                    align="center"
                                    style={{ color: theme.colors.dark[2] }}
                                  >
                                    {day.name}
                                  </Title>
                                  <div>
                                    {day.summary.length > 0 && (
                                      <ActionIcon onClick={() => summaryModal('Day', day.summary)}>
                                        <BiNote />
                                      </ActionIcon>
                                    )}
                                  </div>
                                </div>

                                {day.summary != undefined && day.summary.length > 0 && (
                                  <Text size="sm">Summary: {day.summary}</Text>
                                )}
                                {day.rest ? (
                                  <Center>Rest Day</Center>
                                ) : (
                                  <>
                                    {' '}
                                    <Table highlightOnHover>
                                      <thead>
                                        <tr>
                                          <th></th>
                                          <th>Sets</th>
                                          <th>Reps</th>
                                          <th>RPE</th>
                                          <th>%</th>
                                          <th>Note</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {blocks[i].weeks[w].days[dayIndex].lifts.length > 0 &&
                                          blocks[i].weeks[w].days[dayIndex].lifts !== undefined &&
                                          blocks[i].weeks[w].days[dayIndex].lifts.map(
                                            (l: any, liftIndex: number) => (
                                              <React.Fragment key={liftIndex}>
                                                {l.records.map((t: any, tIndex: number) => (
                                                  <tr key={tIndex}>
                                                    <td>{tIndex == 0 && l.name}</td>
                                                    <td>{t.sets}</td>
                                                    <td>{t.reps}</td>
                                                    <td>{t.rpe}</td>
                                                    <td>{t.percent}</td>
                                                    <td>
                                                      {tIndex == 0 && l.note && (
                                                        <Tooltip
                                                          wrapLines
                                                          withArrow
                                                          transition="fade"
                                                          transitionDuration={200}
                                                          label={l.note}
                                                        >
                                                          <FaRegStickyNote color="cyan" />
                                                        </Tooltip>
                                                      )}
                                                    </td>
                                                  </tr>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                      </tbody>
                                    </Table>
                                    {blocks[i].weeks[w].days[dayIndex].lifts &&
                                      blocks[i].weeks[w].days[dayIndex].lifts !== undefined &&
                                      blocks[i].weeks[w].days[dayIndex].lifts.length > 0 && (
                                        <Group>
                                          <Text>Total Sets: {calcTotalSets(i, w, dayIndex)}</Text>
                                          <Text>Total Reps: {calcTotalReps(i, w, dayIndex)}</Text>
                                        </Group>
                                      )}
                                  </>
                                )}
                              </Group>
                            </Col>
                          ))}
                      </Grid>
                    </Group>
                  </Tabs.Tab>
                ))}
            </Tabs>
          </Tabs.Tab>
        ))}
      </Tabs>
    </Group>
  );
}
