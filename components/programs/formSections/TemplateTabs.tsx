import {
  ActionIcon,
  Badge,
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
import { handleCatColor, handleExpColor, handlePColor } from '../../../utils/ColorHelper';

export default function TemplateTabs({ values }: any): ReactElement {
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
    for (let i = 0; i < values.blocks[b].weeks[w].days[d].lifts.length; i++) {
      for (let j = 0; j < values.blocks[b].weeks[w].days[d].lifts[i].records.length; j++) {
        sum = sum + values.blocks[b].weeks[w].days[d].lifts[i].records[j].sets;
      }
    }
    return sum;
  };
  const calcTotalReps = (b: number, w: number, d: number) => {
    let sum = 0;
    for (let i = 0; i < values.blocks[b].weeks[w].days[d].lifts.length; i++) {
      for (let j = 0; j < values.blocks[b].weeks[w].days[d].lifts[i].records.length; j++) {
        sum =
          sum +
          values.blocks[b].weeks[w].days[d].lifts[i].records[j].reps *
            values.blocks[b].weeks[w].days[d].lifts[i].records[j].sets;
      }
    }
    return sum;
  };
  return (
    <Group direction="column" grow my={20}>
      {/* <Group direction="column" position="left" spacing={0} grow>
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
      </Group> */}

      <Group position="left" noWrap spacing={4}>
        {values.experience.map((e: string, i: number) => {
          return (
            <Badge color={handleExpColor(e)} size="sm" key={e}>
              {e}
            </Badge>
          );
        })}
      </Group>

      <Group position="left" spacing={4}>
        {values.category.sort().map((e: string, i: number) => {
          return (
            <Badge variant="filled" color={handleCatColor(e)} size="md" radius={2} key={e}>
              {e}
            </Badge>
          );
        })}
      </Group>
      <Group position="left" noWrap spacing={4}>
        {values.periodization.sort().map((e: string, i: number) => (
          <Badge variant="outline" color={handlePColor(e)} size="md" radius={2} key={e}>
            {e}
          </Badge>
        ))}
      </Group>

      <Tabs variant="outline">
        {values.blocks.map((block: any, i: number) => (
          <Tabs.Tab key={i} label={block.name}>
            <Tabs variant="pills">
              {values.blocks[i].weeks &&
                values.blocks[i].weeks.length > 0 &&
                values.blocks[i].weeks.map((week: any, w: number) => (
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
                        {values.blocks[i].weeks[w].days.length > 0 &&
                          values.blocks[i].weeks[w].days.map((day: any, dayIndex: number) => (
                            <Col span={12} lg={12} key={dayIndex}>
                              <Group
                                direction="column"
                                grow
                                key={dayIndex}
                                style={{
                                  border: '1px solid ',
                                  borderRadius: 5,
                                  padding: '12px 24px',
                                  borderColor: theme.colors.dark[4],
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

                                {day.rest ? (
                                  <Center>{/* <Title order={2}>Rest Day</Title> */}</Center>
                                ) : (
                                  <>
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
                                        {values.blocks[i].weeks[w].days[dayIndex].lifts.length >
                                          0 &&
                                          values.blocks[i].weeks[w].days[dayIndex].lifts !==
                                            undefined &&
                                          values.blocks[i].weeks[w].days[dayIndex].lifts.map(
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
                                    {values.blocks[i].weeks[w].days[dayIndex].lifts &&
                                      values.blocks[i].weeks[w].days[dayIndex].lifts !==
                                        undefined &&
                                      values.blocks[i].weeks[w].days[dayIndex].lifts.length > 0 && (
                                        <Group>
                                          <div>Total Sets: {calcTotalSets(i, w, dayIndex)}</div>
                                          <div>Total Reps: {calcTotalReps(i, w, dayIndex)}</div>
                                        </Group>
                                      )}{' '}
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
