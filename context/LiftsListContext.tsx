import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

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
  const [userLifts, setUserLifts] = useState<any>([]);
  const [authUser] = useAuthState(auth);
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

  useEffect(() => {
    async function fetchUserLifts() {
      if (authUser?.uid) {
        const unsub = onSnapshot(doc(db, `users/${authUser.uid}/lifts`, authUser.uid), (doc) => {
          console.log('Current data: ', doc.data());
          const data = doc.data();
          if (data) {
            setUserLifts(
              data?.lifts.map((l: any) => {
                console.log('individual ', l);

                return {
                  label: l.name,
                  value: l.name,
                  id: l.id,
                };
              })
            );
          }
        });

        return unsub;
      }
    }
    fetchUserLifts();
    return;
  }, [authUser]);

  return { lifts, userLifts, loading };
}

export const useLiftLibrary = () => useContext(LiftsContext);
