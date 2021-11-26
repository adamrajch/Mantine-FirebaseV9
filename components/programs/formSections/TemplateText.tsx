import { Group, Text, Title } from '@mantine/core';
import React, { ReactElement } from 'react';

export default function TemplateText({ values }: any): ReactElement {
  return (
    <Group direction="column" position="left">
      <Title align="center">{values.title ? values.title : 'Program Title'}</Title>
      <Group direction="column" position="left" spacing={0}>
        <Text mx={0}>
          {`Discipline: `}
          {values.category.map((e: string, i: number) => (
            <Text key={e} component="span" mx={2}>
              {e}
              {i < values.category.length - 1 && ','}
            </Text>
          ))}
        </Text>
        <Text mx={0}>
          {`Level: `}
          {values.experience.map((e: string, i: number) => (
            <Text key={e} component="span" mx={2}>
              {e}
              {i < values.experience.length - 1 && ','}
            </Text>
          ))}
        </Text>

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

      <div>
        {values.blocks.length &&
          values.blocks.map((block, blockIndex: number) => (
            <div key={blockIndex}>
              <Title order={3}>{block.name}</Title>
              <div>
                {values.blocks[blockIndex].weeks.length &&
                  values.blocks[blockIndex].weeks.map((week, weekIndex: number) => (
                    <div style={{ paddingLeft: 10, marginTop: 12 }} key={weekIndex}>
                      <Title order={2} align="center">
                        {week.name}
                      </Title>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: 10,
                          marginTop: 12,
                        }}
                      >
                        {values.blocks[blockIndex].weeks[weekIndex].days.length &&
                          values.blocks[blockIndex].weeks[weekIndex].days.map(
                            (day, dayIndex: number) => (
                              <div
                                key={dayIndex}
                                style={{
                                  border: '1px solid white',
                                  borderRadius: 5,
                                  padding: '12px 24px',
                                }}
                              >
                                <Title order={2} align="center">
                                  {day.name}
                                </Title>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  {values.blocks[blockIndex].weeks[weekIndex].days[dayIndex]
                                    .workouts.length &&
                                    values.blocks[blockIndex].weeks[weekIndex].days[
                                      dayIndex
                                    ].workouts.map((w, workoutIndex: number) => (
                                      <div key={workoutIndex} style={{ marginTop: 8 }}>
                                        <div>{w.type !== 'single' && <Text>{w.name}</Text>}</div>
                                        {w.lifts.map((lift, lIndex) => (
                                          <div
                                            key={lIndex}
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
                                              {lift.records.map((r, rIndex) => (
                                                <Text key={rIndex}>
                                                  {`${r.sets} x ${r.reps}`}{' '}
                                                  {r.rpe !== null && `@${r.rpe}`}
                                                  {r.percent !== null && `${r.percent}%`}
                                                  {r.load !== null && `${r.load}${r.unit}`}
                                                </Text>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ))}
                                </div>
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
    </Group>
  );
}
