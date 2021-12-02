import { doc, setDoc } from '@firebase/firestore';
import { db } from '../firebase';

export async function createUser(uid: string, data: any) {
  return await setDoc(
    doc(db, 'users', uid),
    {
      uid,
      ...data,
    },
    { merge: true }
  );
}
