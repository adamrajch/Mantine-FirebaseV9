export type Record = {
  sets: number;
  reps: number;
  rpe: number | null;
  unit: string;
  percent: number | null;
};

export type Lift = {
  name: string;
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

export type Program = {
  title: string;
  public: boolean;
  category: string[];
  periodization: string[];
  experience: string[];
  photoUrl: string;
  blocks: Array<{
    name: string;
    summary: string | null;
    weeks: Array<{
      name: string;
      summary: string;
      days: Array<{
        name: string;
        summary: string;
        lifts: Array<{
          name: string;
          note: string;
          records: Array<{
            sets: number;
            reps: number;
            rpe: number | null;
            unit: string | null;
            percent: number | null;
          }>;
        }>;
      }>;
    }>;
  }>;
};
// export { Record, Lift, Day, Workout, Week, Block };
