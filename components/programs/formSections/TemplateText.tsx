import { Badge, Group, Text, Title } from '@mantine/core';
import React, { ReactElement } from 'react';

export default function TemplateText({ values }: any): ReactElement {
  console.log(values);
  return (
    <div>
      <Title align="center">{values.title}</Title>
      <Group>
        {values.category.map((cat: string) => (
          <Badge key={cat} variant="gradient" gradient={{ from: 'teal', to: 'blue' }}>
            {cat}
          </Badge>
        ))}
      </Group>
      <Group>
        {values.experience.map((exp: string) => (
          <Badge key={exp} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
            {exp}
          </Badge>
        ))}
      </Group>
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
      <div>
        {values.blocks.length &&
          values.blocks.map((block, blockIndex: number) => (
            <div>
              <Title order={3}>{block.name}</Title>
              <div>
                {values.blocks[blockIndex].weeks.length &&
                  values.blocks[blockIndex].weeks.map((week, weekIndex: number) => (
                    <div style={{ paddingLeft: 10 }}>
                      <Title order={3} align="center">
                        {week.name}
                      </Title>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {values.blocks[blockIndex].weeks[weekIndex].days.length &&
                          values.blocks[blockIndex].weeks[weekIndex].days.map(
                            (day, dayIndex: number) => (
                              <div
                                style={{ border: '1px solid white', borderRadius: 5, padding: 12 }}
                              >
                                <Title order={2} align="center">
                                  {day.name}
                                </Title>
                                <Group direction="column">
                                  {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex]
                                    .workouts.length &&
                                    values.blocks[blockIndex].weeks[weekIndex].days[
                                      dayIndex
                                    ].workouts.map((w, workoutIndex: number) => (
                                      <div>
                                        <div>{w.type !== 'single' && <Text>{w.name}</Text>}</div>
                                        {w.lifts.map((lift) => (
                                          <div
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'flex-start',
                                              paddingLeft: w.type !== 'single' ? 10 : '',
                                              gap: 20,
                                            }}
                                          >
                                            <Text>{lift.name}</Text>
                                            <div
                                              style={{ display: 'flex', flexDirection: 'column' }}
                                            >
                                              {lift.records.map((r) => (
                                                <Text>
                                                  {`${r.sets} x ${r.reps}`}{' '}
                                                  {r.rpe !== undefined && `@${r.rpe}`}
                                                  {r.percent !== undefined && `${r.percent}%`}
                                                  {r.load !== undefined && `${r.load}${r.unit}`}
                                                </Text>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ))}
                                </Group>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
