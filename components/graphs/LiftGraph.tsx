import { Box } from '@mantine/core';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
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
    const q = query(
      collection(db, `users/${userId}/records`),
      where('name', '==', lift.value),
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
  const dataSet = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];
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
            <Tooltip />
            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>

        {records.length > 0 &&
          records.map((r: any) => <div key={r.recordId}>{r.records.load}</div>)}
      </Box>
    </div>
  );
}
