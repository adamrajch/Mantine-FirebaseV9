import { Lift, Week } from '../../types/types';

export const BasicDays = [
  {
    name: 'Day 1',
    summary: '',
    rest: false,
    lifts: [
      {
        name: 'New Lift',
        note: '',
        records: [
          {
            sets: 5,
            reps: 5,
            rpe: null,
            percent: null,
          },
        ],
      },
    ],
  },
  // {
  //   name: 'Day 2',
  //   summary: '',
  //   rest: false,
  //   lifts: [
  //     {
  //       name: 'New Lift',
  //       note: '',
  //       records: [
  //         {
  //           sets: 5,
  //           reps: 5,
  //           // unit: 'lbs',
  //           rpe: null,
  //           percent: null,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: 'Day 3',
  //   summary: '',
  //   rest: false,
  //   lifts: [
  //     {
  //       name: 'New Lift',
  //       note: '',
  //       records: [
  //         {
  //           sets: 5,
  //           reps: 5,
  //           // unit: 'lbs',
  //           rpe: null,
  //           percent: null,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: 'Day 4',
  //   summary: '',
  //   rest: false,
  //   lifts: [
  //     {
  //       name: 'New Lift',
  //       note: '',
  //       records: [
  //         {
  //           sets: 5,
  //           reps: 5,
  //           // unit: 'lbs',
  //           rpe: null,
  //           percent: null,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: 'Day 5',
  //   summary: '',
  //   rest: false,
  //   lifts: [
  //     {
  //       name: 'New Lift',
  //       note: '',
  //       records: [
  //         {
  //           sets: 5,
  //           reps: 5,
  //           // unit: 'lbs',
  //           rpe: null,
  //           percent: null,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: 'Day 6',
  //   summary: '',
  //   rest: false,
  //   lifts: [
  //     {
  //       name: 'New Lift',
  //       note: '',
  //       records: [
  //         {
  //           sets: 5,
  //           reps: 5,
  //           // unit: 'lbs',
  //           rpe: null,
  //           percent: null,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: 'Day 7',
  //   summary: '',
  //   rest: false,
  //   lifts: [
  //     {
  //       name: 'New Lift',
  //       note: '',
  //       records: [
  //         {
  //           sets: 5,
  //           reps: 5,
  //           // unit: 'lbs',
  //           rpe: null,
  //           percent: null,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const BasicWeeks: Week[] = [{ name: '', summary: '', days: BasicDays }];

export const BasicLifts: Lift[] = [
  {
    name: 'New Lift',
    note: '',
    records: [
      {
        sets: 5,
        reps: 5,
        // unit: 'lbs',
        rpe: null,
        percent: null,
      },
    ],
  },
];
