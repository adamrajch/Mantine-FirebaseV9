export type Record = {
  type: string;
  sets: number;
  reps: number;
  rpe?: number;
  load?: number;
  unit: string;
  percent?: number;
};

export type Lift = {
  name: string;
  records: Record[];
};

export type Workout = {
  name: string;
  type: string;
  note?: string;
  lifts: Lift[];
};

export type Day = {
  name: string;
  summary?: string;
  workouts: Workout[];
};

export type Week = {
  name: string;
  summary?: string;
  days: Day[];
};

export type Block = {
  name: string;
  summary?: string;
  weeks: Week[];
};

// export { Record, Lift, Day, Workout, Week, Block };
