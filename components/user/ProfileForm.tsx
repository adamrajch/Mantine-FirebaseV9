import { doc, setDoc } from '@firebase/firestore';
import {
  Button,
  Col,
  Container,
  Grid,
  Group,
  NumberInput,
  SegmentedControl,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { Form, Formik } from 'formik';
import React from 'react';
import { db } from '../../firebase';

interface MyFormValues {
  name: string;
  email: string;
  bio: string;
  height: number;
  weight: number;
  sex: string;
}

export default function ProfileForm({ user }: any): JSX.Element {
  const { name, email, photoUrl, bio, height, weight, sex } = user;
  const notifications = useNotifications();
  console.log('from profile', user);
  const initialValues: MyFormValues = {
    name: name,
    email: email,
    bio: user.bio ? bio : '',
    height: height ? height : 72,
    weight: weight ? weight : 200,
    sex: sex ? sex : 'male',
  };
  return (
    <Container size="md">
      <Title order={1} align="center">
        Profile
      </Title>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          if (values === initialValues) {
            notifications.showNotification({
              title: 'No change in profile',
              message: `Change something`,
            });
            actions.setSubmitting(false);
            return;
          }
          try {
            await setDoc(
              doc(db, 'users', user.uid),
              {
                ...values,
              },
              { merge: true }
            );
            notifications.showNotification({
              title: 'Saved',
              message: `Successfully saved your profile`,
            });
          } catch (error) {
            console.log('from comment : ', error);
            actions.setSubmitting(false);
          }
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleChange,
          handleBlur,
          values,
          errors,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid>
              {/* <Group direction="column" spacing={0}>
                <Avatar size="md" src={`${user.photoUrl}`} alt="user" />
                <Text size="xs">Change </Text>
              </Group> */}
              {/* <TextInput
                label="Photo Source"
                value={values.name}
                name="name"
                error={errors.name}
                onChange={handleChange}
              /> */}

              <Col span={12} md={6}>
                <TextInput
                  label="Username"
                  value={values.name}
                  name="name"
                  error={errors.name}
                  onChange={handleChange}
                />
              </Col>
              <Col span={12} md={6}>
                <TextInput
                  label="Email"
                  type="email"
                  value={values.email}
                  error={errors.email}
                  disabled
                />
              </Col>
              <Col span={12} md={6}>
                <NumberInput
                  label="Height"
                  autoComplete="false"
                  min={1}
                  step={1}
                  max={999}
                  value={values.height}
                  onChange={(value) => setFieldValue('height', value)}
                  name="height"
                  styles={{
                    icon: {
                      fontSize: 12,
                    },
                  }}
                  icon={<span>cm</span>}
                />
              </Col>
              <Col span={12} md={6}>
                <NumberInput
                  label="weight"
                  autoComplete="false"
                  min={1}
                  step={5}
                  max={999}
                  value={values.weight}
                  onChange={(value) => setFieldValue('weight', value)}
                  name="weight"
                  styles={{
                    icon: {
                      fontSize: 12,
                    },
                  }}
                  icon={<span>kg</span>}
                />
              </Col>
              <Col span={12}>
                <Group position="center" grow>
                  <SegmentedControl
                    value={values.sex}
                    onChange={(value) => setFieldValue('sex', value)}
                    data={[
                      { label: 'Male', value: 'male' },
                      { label: 'Female', value: 'female' },
                      { label: 'Other', value: 'other' },
                    ]}
                  />
                </Group>
              </Col>
              <Col span={12}>
                <Textarea value={values.bio} onChange={handleChange} name="bio" />
              </Col>
              <Col span={12}>
                <Group position="right">
                  <Button type="submit" variant="outline" loading={isSubmitting}>
                    Submit
                  </Button>
                </Group>
              </Col>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
