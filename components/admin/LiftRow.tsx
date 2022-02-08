import { ActionIcon, Button, Group, Modal, Text, TextInput } from '@mantine/core';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { db } from '../../firebase';

type Props = {
  id: string;
  value: string;
  lifts: any;
  //   label: string;
};

export default function LiftRow({ id, value, lifts }: Props) {
  const [delLoading, setDelLoading] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [val, setVal] = useState<string>(value);

  async function handleDelete() {
    setDelLoading(true);

    try {
      const liftsRef = doc(db, 'global-lifts', 'global');
      let filtered = lifts.filter((l: Props) => l.value !== value);
      console.log(filtered, value);
      await updateDoc(liftsRef, {
        lifts: filtered,
      });

      setDelLoading(false);
      console.log('deleted lift ', value);
    } catch (err) {
      console.log(err);

      setDelLoading(false);
      setOpen(false);
    }
  }

  async function handleEditLift() {
    setEditLoading(true);

    const exist = lifts.find((e: any) => e.value.toLowerCase().trim() === val.toLowerCase().trim());
    console.log(exist === undefined ? 'new' : 'stale');
    const liftIndex = lifts.findIndex((lift: any) => lift.id === id);
    console.log('lift index: ', liftIndex);

    if (val.trim().length > 0 && val.trim() !== value && liftIndex !== -1) {
      try {
        //rename lift in array

        let updated = lifts;
        updated[liftIndex].value = val;

        const liftsRef = doc(db, 'global-lifts', 'global');
        await updateDoc(liftsRef, {
          lifts: updated,
        });
        console.log('lift index: ', liftIndex);
        console.log('updated object : ', lifts[liftIndex]);
        console.log('updated');
      } catch (err) {
        console.log(err);
      }
    }

    setEditLoading(false);
    setEditOpen(false);
  }
  return (
    <>
      <tr key={id}>
        <td>{id.substring(0, 5)}</td>
        <td>{value}</td>
        <td>
          <ActionIcon onClick={() => setEditOpen(true)}>
            <AiFillEdit />
          </ActionIcon>
        </td>
        <td>
          <ActionIcon onClick={() => setOpen(true)}>
            <AiFillDelete />
          </ActionIcon>
        </td>
      </tr>
      <>
        <Modal
          opened={open}
          onClose={() => setOpen(false)}
          title="Are you sure to delete this lift?"
        >
          <Text>Delete this :D</Text>
          <Group grow position="center">
            <Button onClick={() => setOpen(false)} size="xs">
              Cancel
            </Button>
            <Button onClick={handleDelete} loading={delLoading} size="xs">
              Delete
            </Button>
          </Group>
        </Modal>
      </>
      <>
        <Modal opened={editOpen} onClose={() => setEditOpen(false)} title="Edit Lift">
          <Group direction="column" grow>
            <TextInput
              value={val}
              onChange={(e) => {
                e.preventDefault(), setVal(e.currentTarget.value);
              }}
            />
            <Group grow position="center">
              <Button onClick={() => setEditOpen(false)} size="xs" variant="outline">
                Cancel
              </Button>
              <Button onClick={handleEditLift} loading={editLoading} size="xs">
                Save
              </Button>
            </Group>
          </Group>
        </Modal>
      </>
    </>
  );
}
