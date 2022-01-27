import { Box, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
// import { NameType, ValueType } from 'recharts/src/component/DefaultTooltipContent';
import { db } from '../../firebase';
type Props = {
  lift: {
    value: string;
    label: string;
    id: string;
  };
  userId: string;
};

export default function LiftGraph({ lift, userId }: Props) {
  const [records, setRecords] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getRecords(lift.id);
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  dayjs.extend(toObject);
  async function getRecords(id: string) {
    console.log('fetching');
    const q = query(
      collection(db, `users/${userId}/records`),
      where('name', '==', lift.value),
      orderBy('date', 'asc'),
      limit(20)
    );

    const querySnapshot = await getDocs(q);
    // setRecords(
    //   querySnapshot.map((r: any) => {
    //     return {
    //       ...r.data(),
    //     };
    //   })
    // );
    let arr: any = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push({ ...doc.data(), recordId: doc.id });
      //   setRecords((prev: any) => [...prev, doc.data()]);
    });

    setData(
      arr.map((r: any) => {
        return {
          ...r.records,
          date: r.date.toDate().toISOString().substr(0, 10),
        };
      })
    );
  }

  return (
    <div>
      <Box my={20}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area dataKey="load" stroke="#00b4fb" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={(str) => {
                const date = dayjs(str).toObject();
                if (date.date % 7 === 0) {
                  return dayjs(str).format('MMM, D');
                }
                return dayjs(str).format('MMM, D');
              }}
            />
            <YAxis
              dataKey="load"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={(number) => `${number.toFixed(1)} `}
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
        {/* <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            width={400}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="date" name="date" unit="cm" />
            <YAxis type="number" dataKey="load" name="weight" unit="lb" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Lift History" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer> */}
        {records.length > 0 &&
          records.map((r: any) => <div key={r.recordId}>{r.records.load}</div>)}
      </Box>
    </div>
  );
}
// : TooltipProps<ValueType, NameType>
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload) {
    return (
      <Box
        sx={(theme) => ({
          padding: 16,
          borderRadius: theme.radius.md,

          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[1],
          boxShadow: '3px 3px  16px   #0f0f0f, -1px -1px 2px #14abe7',
        })}
      >
        <Title order={5}>{dayjs(label).format('dddd, D MMM, YYYY')}</Title>
        <Text>
          {`${payload[0].payload.sets}x${payload[0].payload.reps} ${payload[0].value} ${
            payload[0].payload.rpe ? `@${payload[0].payload.rpe}` : ''
          } `}
        </Text>
        {/* <Text>{JSON.stringify(payload[0], null, 2)}</Text> */}
      </Box>
    );
  }

  return null;
};
