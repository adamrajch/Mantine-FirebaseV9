import { Button, Group, Textarea } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { db } from '../../../firebase';

type FormValues = {
  comment: string;
};
const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .min(2, 'Must be between 1-500')
    .max(200, 'Must be between 1-500')
    .required('Required'),
});
export default function CommentForm({ programID, user }: any): JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const notifications = useNotifications();

  async function handleSub(values: FormValues, resetForm: any) {
    try {
      setSubmitting(true);
      await addDoc(collection(db, 'comments'), {
        user: user.uid,
        name: user.name,
        programID: programID,
        comment: values.comment,
        parentID: null,
        createdDate: serverTimestamp(),
      });
      notifications.showNotification({
        title: 'Comment Posted',
        message: `Successfully posted your comment!`,
      });
      resetForm();
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.log('from comment : ', error);
    }
  }
  const initialValues: FormValues = {
    comment: '',
  };
  return (
    <div>
      {user && (
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => console.log('submit')}
          enableReinitialize={false}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={CommentSchema}
        >
          {({
            handleSubmit,
            setFieldValue,
            handleChange,
            handleBlur,
            values,
            errors,
            resetForm,
          }) => (
            <Form>
              <Group position="left" direction="column" grow>
                <Textarea
                  error={errors.comment}
                  name="comment"
                  value={values.comment}
                  onChange={handleChange}
                  placeholder="Write a comment"
                />

                <Group position="right">
                  <Button color="dark">Cancel</Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSub(values, resetForm)}
                    loading={submitting}
                  >
                    Post
                  </Button>
                </Group>
              </Group>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
