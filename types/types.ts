export type Record = {
  type: string;
  sets: number;
  reps: number;
  rpe: number | null;
  load: number | null;
  unit: string;
  percent: number | null;
};

export type Lift = {
  name: string;
  type: string;
  note: string;
  records: Record[];
};

export type Workout = {
  name: string;
  type: string;
  note: string | null;
  lifts: Lift[];
};

export type Day = {
  name: string;
  summary: string | null;
  workouts: Workout[];
};

export type Week = {
  name: string;
  summary: string | null;
  days: Day[];
};

export type Block = {
  name: string;
  summary: string | null;
  weeks: Week[];
};

// export { Record, Lift, Day, Workout, Week, Block };
