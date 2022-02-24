import { doc, onSnapshot } from 'firebase/firestore';
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
  const [loading, setLoading] = useState<any>(true);
  const [lifts, setLifts] = useState<any>([]);
  const [userLifts, setUserLifts] = useState<any>([]);
  const [authUser, authLoading] = useAuthState(auth);
  useEffect(() => {
    async function subscribeUserLifts() {
      const unsub = onSnapshot(doc(db, 'global-lifts', 'global'), (doc) => {
        // console.log('Current data: ', doc.data());
        const data = doc.data();
        if (data) {
          setLifts(
            data?.lifts.map((l: any) => {
              return {
                label: l.value,
                value: l.value,
                name: l.value,
                id: l.id,
              };
            })
          );
        }
      });

      return unsub;
    }
    subscribeUserLifts();

    return () => {
      setLoading({});
    };
  }, []);

  useEffect(() => {
    async function fetchUserLifts() {
      if (authUser?.uid) {
        const unsub = onSnapshot(doc(db, `users/${authUser.uid}/lifts`, authUser.uid), (doc) => {
          // console.log('Current data: ', doc.data());
          const data = doc.data();
          if (data) {
            setUserLifts(
              data?.lifts.map((l: any) => {
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
    if (authUser) {
      fetchUserLifts();
    }

    return () => {
      setLoading({});
    };
  }, [authUser]);

  return { lifts, userLifts, loading };
}

export const useLiftLibrary = () => useContext(LiftsContext);
