import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';

type Props = {
  children?: React.ReactNode;
};
const LiftsContext = createContext<any>({});

export function LiftsProvider({ children }: Props) {
  const ListData = useLiftsData();
  return <LiftsContext.Provider value={ListData}>{children}</LiftsContext.Provider>;
}

export function useLiftsData() {
  const [loading, setLoading] = useState(true);
  const [lifts, setLifts] = useState<any>([]);

  useEffect(() => {
    async function fetchLifts() {
      const docRef = doc(db, 'global-lifts', 'global');
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (docSnap.exists()) {
        setLifts(
          data?.lifts.map((l: any) => {
            return {
              label: l.name,
              value: l.name,
              id: l.id,
            };
          })
        );
      } else {
        console.log('No such document!');
      }
      setLoading(false);
    }

    fetchLifts();

    return;
  }, []);

  return { lifts, loading };
}

export const useLiftLibrary = () => useContext(LiftsContext);
