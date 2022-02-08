import { Button, Group, TextInput } from '@mantine/core';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useLiftsData } from '../../context/LiftsListContext';
import { db } from '../../firebase';

export default function AddLiftForm() {
  const [val, setVal] = useState<string>('');
  const [sub, setSub] = useState<boolean>(false);

  const { lifts } = useLiftsData();

  async function handleAddLift(e: any) {
    e.preventDefault();
    setSub(true);
    if (val.trim().length > 0) {
      try {
        let newId = nanoid();
        const liftsRef = doc(db, 'global-lifts', 'global');

        const exist = lifts.find(
          (e: any) => e.value.toLowerCase().trim() === val.toLowerCase().trim()
        );
        if (exist === undefined) {
          await updateDoc(liftsRef, {
            lifts: arrayUnion({
              id: newId,
              value: val.trim(),
              name: val.trim(),
            }),
          });
        } else {
          console.log('already have that lift');
        }
      } catch (err) {
        console.log(err);
      }
    }

    setVal('');
    setSub(false);
  }

  return (
    <div>
      <form onSubmit={handleAddLift}>
        <Group grow>
          <TextInput
            placeholder="Add New Lift"
            value={val}
            onChange={(e) => {
              e.preventDefault(), setVal(e.currentTarget.value);
            }}
          />
          <Button
            size="sm"
            onClick={(e: any) => {
              handleAddLift(e);
            }}
            onKeyPress={(e: any) => {
              if (e.key === 'Enter') {
                handleAddLift(e);
              }
            }}
            loading={sub}
            disabled={val.trim().length > 0 ? false : true}
          >
            Add Lift
          </Button>
        </Group>
      </form>
    </div>
  );
}
