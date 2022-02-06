import React from 'react';

type Props = {};

export default function TemplateGrid({}: Props) {
  return (
    <div>
      {' '}
      {/*                         
                        <Grid justify="space-around">
                          {p.blocks[i].weeks[w].days.length > 0 &&
                            p.blocks[i].weeks[w].days.map((day: any, dayIndex: number) => (
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
                                        <ActionIcon
                                          onClick={() => summaryModal('Day', day.summary)}
                                        >
                                          <BiNote />
                                        </ActionIcon>
                                      )}
                                    </div>
                                  </div>

                                  {day.rest ? (
                                    <Center> </Center>
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
                                          {p.blocks[i].weeks[w].days[dayIndex].lifts.length > 0 &&
                                            p.blocks[i].weeks[w].days[dayIndex].lifts !==
                                              undefined &&
                                            p.blocks[i].weeks[w].days[dayIndex].lifts.map(
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
                                      {p.blocks[i].weeks[w].days[dayIndex].lifts &&
                                        p.blocks[i].weeks[w].days[dayIndex].lifts !== undefined &&
                                        p.blocks[i].weeks[w].days[dayIndex].lifts.length > 0 && (
                                          <Group>
                                            <div>Total Sets: {calcTotalSets(i, w, dayIndex)}</div>
                                            <div>Total Reps: {calcTotalReps(i, w, dayIndex)}</div>
                                          </Group>
                                        )}
                                    </>
                                  )}
                                </Group>
                              </Col>
                            ))}
                        </Grid> */}
    </div>
  );
}
