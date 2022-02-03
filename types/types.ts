export type Record = {
  sets: number;
  reps: number;
  rpe: number | null;
  unit?: string;
  percent: number | null;
};

export type Lift = {
  name: string;
  note: string;
  // unit: string;
  records: Record[];
};

export type Day = {
  name: string;
  summary: string | null;
  lifts: Lift[];
  rest: boolean;
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
        rest: boolean;
        lifts: Array<{
          name: string;
          note: string;
          id?: string;
          // type: string;
          records: Array<{
            type?: string;
            sets: number;
            reps: number;
            load?: number | null;
            rpe?: number | null;
            unit?: string | null;
            percent: number | null;
            time?: number | null;
          }>;
        }>;
      }>;
    }>;
  }>;
};
// export { Record, Lift, Day, Workout, Week, Block };
