import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function createUser(uid: string, data: any) {
  return await setDoc(
    doc(db, 'users', uid),
    {
      uid,
      likedPrograms: [],
      savedPrograms: [],
      subscribedPrograms: [],
      recentWorkouts: [],
      trackedLifts: [],
      ...data,
    },
    { merge: true }
  );
}
