import { Button, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../../firebase';

type FormValues = {
  comment: string;
};
export default function CommentForm({ programID, user }: any): JSX.Element {
  const [submitting, setSubmitting] = useState(false);

  const notifications = useNotifications();

  const form = useForm({
    initialValues: {
      comment: '',
    },

    validationRules: {
      comment: (value) => value.length > 0 && value.length < 500,
    },
  });

  async function handleSubmit(values: FormValues) {
    try {
      setSubmitting(true);
      await addDoc(collection(db, 'comments'), {
        user: user.email,
        programID: programID,
        comment: values.comment,
        createdDate: serverTimestamp(),
      });
      notifications.showNotification({
        title: 'Comment Posted',
        message: `Successfully posted your comment!`,
      });
      form.reset();
      setSubmitting(false);
    } catch (error) {
      console.log('from comment : ', error);
    }
  }
  return (
    <div>
      {user && (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Group position="left" direction="column" grow>
            <Textarea
              error={form.errors.comment && 'Must be between 1-500 characters'}
              value={form.values.comment}
              onChange={(event) => form.setFieldValue('comment', event.currentTarget.value)}
            />

            <Group position="right">
              <Button color="dark">Cancel</Button>
              <Button variant="outline" type="submit" loading={submitting}>
                Post
              </Button>
            </Group>
          </Group>
        </form>
      )}
    </div>
  );
}
