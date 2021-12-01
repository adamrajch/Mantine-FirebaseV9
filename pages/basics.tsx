import { Container, Group, List, Text, ThemeIcon, Title } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import React from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Layout from '../components/dashboard/AppShell';

const definitions = [
  {
    w: 'Training Program',
    d: "  A general or specific template that outlines one's training regimen. Programs can be broad or specific in their goals",
  },

  {
    w: 'Hypertrophy',
    d: 'A goal of training to get bigger, more muscle mass',
  },
  {
    w: 'Periodization',
    d: 'How a program organizes and regulates intensities over time',
  },
  {
    w: 'CNS',
    d: 'Central Nervous System',
  },
  {
    w: 'Peaking',
    d: 'The end of a training cycle with the goal to enter peak performance for a competition',
  },
  {
    w: 'Over-reaching',
    d: "Pushing into a mild state of fatigue with training. Regression in performance sometimes does occur during an over-reaching period, yet performance rebounds back very quickly, usually above and beyond it's previous level, with a short period of rest or lowered volume (within days)",
  },
  {
    w: 'Under-reaching',
    d: 'Occurs when you intentionally "take it easy". This is like taking your foot off the gas in your training intentionally. It also can be good or bad depending on how you do it',
  },

  {
    w: 'RPE',
    d: 'Rate of percieved exertion. A scale from 1-10 dictating how "intense" an exercise is. A "10" is a true max effort, with 0 reps left in the tank. Where as a "6" would be 4 reps witheld from failure    ',
  },
];
export default function Basics(): JSX.Element {
  const navH = 60;
  const { scrollIntoView, targetRef: keyDefRef } = useScrollIntoView({ offset: navH });
  const { scrollIntoView: scrollIntoPR, targetRef: fpRef } = useScrollIntoView({
    offset: navH,
  });
  const { scrollIntoView: scrollIntoPeriodization, targetRef: pRef } = useScrollIntoView({
    offset: navH,
  });
  return (
    <Layout>
      <Title order={1} align="center" my={24}>
        Training Basics
      </Title>
      <div style={{ display: 'flex', alignContent: 'flex-start' }}>
        <Container size="md">
          <Text my="sm">
            A brief dive into the fundamentals of training. Effort will only get you so far, a good
            understanding of how proper training affects your results is essential to progressoin
            long term. The more experience you get, the more you will need to implement sound
            periodization and training techniques to stay injury free and keep smashing personal
            records
          </Text>

          <Group direction="column" spacing={48} grow>
            <Group direction="column" grow>
              <Title align="center" ref={keyDefRef}>
                Key Definitions
              </Title>
              <Group direction="column">
                {definitions.map((def) => (
                  <Text key={def.d}>
                    <Text component="span" color="cyan">
                      {def.w}:{' '}
                    </Text>
                    {def.d}
                  </Text>
                ))}
              </Group>
            </Group>
            <Title align="center" ref={fpRef}>
              Foundational Principles of Training
            </Title>
            <Group direction="column">
              <Group direction="column">
                <Title order={2}>Specificity</Title>
                <Title order={4}>
                  Physiological adaptations are specific to the muscles trained, intensity of
                  exercise and metabolic demands of exercise
                </Title>
                <Text>
                  Carryover of training to performance is dependent on the sport and program. A
                  training program for powerlifting will have huge carry over because competition
                  movements are being practiced every session. A program to develop football
                  strength and power wont have 100% carryover due to the nature of the movements and
                  training compared to the actualy athletic performance needed. For program design,
                  chose exercises that has similar neuromuscular coordination and targeted muscles
                  for most carryover
                </Text>
              </Group>
              <Group direction="column">
                <Title order={2}>Overload</Title>
                <Title order={4}>
                  For adaptations to occur then the demand of the exercise must exceed what the body
                  is normally accustomed to. If no change in training intensity, overall intesnity
                  will lessen overtime for athlete and will cease to make adaptations. A program's
                  periodization will dictate the changes of intensity over time
                </Title>

                <Text>
                  Progressive overload can occur in many ways when it comes to training
                  <List>
                    <List.Item>Increase intensity / volume ( effort ) </List.Item>
                    <List.Item>Heavier loads lifted</List.Item>
                    <List.Item>More time under tension / less rest between sets</List.Item>
                    <List.Item>Variability, new challenging movements</List.Item>
                  </List>
                </Text>
              </Group>
              <Group direction="column">
                <Title order={2}>Individuality</Title>
                <Text>
                  Athletes respond differently to training programs. 50 athletes will yield 50
                  different responses to a single program. There are several factors to explain this
                  such as training age, genetics, and gender.
                </Text>
              </Group>
            </Group>
            <Group direction="column">
              <Title order={2}>Dimishing Gains</Title>
              <Text>
                As training continues, strength and performance gains are more difficult to achieve.
                Everyone has different genetic ceilings. The law of accommodation states that
                repeated effort of the same stimulus will result in in less and less adaptation. One
                needs to change the stimulus on a regular basis to achieve results. This is one of
                the driving principles behend the Conjugate Method and Westside Barbell.
              </Text>
            </Group>
            <Group direction="column">
              <Title order={2}>Reversibility, Detraining And Overtraining</Title>
              <Title order={4}>
                Once a training stimulus is removed the performance gains will revert back to their
                original state (Detraining)
              </Title>
              <Title order={4}>
                Overtraining is when an athlete chronically over-reaches for months or years. This
                leads to performance regression and possibly other negative results
              </Title>
              <List>
                <List.Item>Oxidative enzyme activity in muscles decreases (up to 60%)</List.Item>
                <List.Item>
                  Glycolytic enzymes remain unchanged with up to 84 days of detraining
                </List.Item>
                <List.Item>Muscle glycogen content (and thus storage capacity) decreases</List.Item>
                <List.Item>Acid-base balance becomes disturbed</List.Item>
                <List.Item>Muscle capillary supply and fiber type may change</List.Item>
                <List.Item>
                  Most lost after a short break (3 weeks) comes from lost neural adaptations, muscle
                  loss won't occur until 2-3 weeks of inactivity
                </List.Item>
                <List.Item>
                  Feeling "smaller" after 4-5 day break is not muscle loss, just a decrease in
                  muscular inflammation, a decrease in myogenic tone, and lower level of
                  intramuscular glycogen
                </List.Item>
              </List>
              <Text>
                Overtraining leads to performance regression that takes months of recovery. This can
                lead to permanent endocrine disruptions and fatigue. Most athletes never reach a
                true overtrained state. Overtraining can lead to an imbalance in the autonomic
                nervous system. This can result in sympathetic overdrive during rest (restlessness,
                weight loss, increase in resting HR), paraympathetic overdrive during exercise
                (fatigue, depression, reduced resting HR), and exhaustion of neuroendocrine system.
                This can also be monitored by Testosterone/Cortisol ratio. Cortisol is a stress
                hormone that breaks down glyogen and fat stores to produce energy. However if the
                balance is disrupted, too much cortisol can be catabolic in nature, and recovery
                will be insuffecient
              </Text>
              <Title order={4}>High Cortisol</Title>
              <List>
                <List.Item>
                  A corticosteroid, decreases immunity by inhibiting actions of white blood cells
                </List.Item>
                <List.Item>Increases abdominal fat deposition</List.Item>
                <List.Item>
                  Cortisol promotes the breakdown of muscle, bone, and connective tissue in order to
                  increase blood sugar for the brain
                </List.Item>
                <List.Item>Inhibits thyroid hormone activation</List.Item>
              </List>
              <Text>
                Overtraining is multifactorial and can be a result of excessive training, emotional
                stress, endocrine imbalances, depressed immune function, nutrition, lack of sleep,
                and psychological factors
              </Text>
              <Text>
                They key to preventing over-reaching and overtraining is to prioritize rest and
                recovery. Overtraining can take weeks to months to fully recover
              </Text>
            </Group>

            <Group direction="column" spacing={32} grow>
              <Title align="center" ref={pRef}>
                Periodization
              </Title>
              <Group direction="column">
                <Group direction="column">
                  <Title order={4}>
                    Periodization is the process and organizing of a program, adjusting workouts and
                    training cycles to improve progression and performance
                  </Title>
                  <Text>
                    When designing and periodizing a program one has to take into acount many
                    variables. A program must follow a goal, and have speficic enough exercises to
                    translate into performance in the goal. Overtime, intensities must be altered to
                    stave accomodation and staleness. Too intense of training and you risk burnout.
                    To easy and it stops becoming fruitful and more boring. Ideally, the intensities
                    should in a range where its challenging enough to create positive adaptations
                    and easy enough so its not anxiety or injury inducing. However, it might be
                    beneficial to have very high intensity workouts programmed, going to RPE 10 or
                    even past failure. The following types of progressions are a few ways to
                    organize your training over time.
                  </Text>
                </Group>
              </Group>
              <Group direction="column">
                <Group direction="column">
                  <Title order={3}>Linear Progression</Title>
                  <Text>
                    Usually the most popular form, especailly for beginners, linear progression is
                    when more stress is gradually applied each workout. In theory, you adapt to each
                    stress and keep increasing the stress over time. Some basic examples, adding
                    10lb on your squat each week for 6 weeks straight or running for 30sec longer
                    each time you jog. This is an effective way to model a program for beginners due
                    to their nature to gain strength and perform better each workout. Novices that
                    are untrained can add weight each workout because of their neural adaptations
                    and coordination greatly increases each time they touch a new movement. Linear
                    progression will ultimately lead to a plateau, where one eventaulyl fails and
                    would have to do a deload.
                  </Text>
                </Group>
              </Group>
              <Group direction="column">
                <Group direction="column">
                  <Title order={3}>Block</Title>
                  <Text>
                    Some programs may be divided into 2-4 week periods or "blocks". What occurs in
                    these blocks are dependent on the program or coach. Block periodization is
                    benefitial to athletes who need to focus on certain adaptations for their sport.
                    For example, focusing on a 3 week speed block for a tennis player, or a high
                    volume bench block for a powerlifter. A popular schema is to divide the program
                    into accumulation (50-75% intensity), transmutation (75-90%), and realization
                    (90%+). Another example is dividing heavy / volume intensities during each block
                    and rotating exercises. Take the Cube Method for example, where you only lift
                    heavy for each main movement once each block(3 weeks), and rotate between the
                    other movements in different intensities.
                  </Text>
                </Group>
              </Group>
              <Group direction="column">
                <Group direction="column">
                  <Title order={3}>Non-Linear / Undulated</Title>
                  <Text>
                    Unlike the gradual increase of on variable in linear periodization, undulated
                    periodization changes various stimuli in the program. Exercise selection,
                    volume, intesity, and frequency are often changing in the given time frame.
                    Daily Undulating Periodization (DUP) has changes each workout, but there can
                    also be weekly or bi-weekly undulations in a given program. This is a popular
                    training method for advanced athletes, training concurrent variables like
                    strength, power, and endurance.
                  </Text>
                </Group>
              </Group>
              <Group direction="column">
                <Group direction="column">
                  <Title order={3}>Wave</Title>
                  <Text>
                    Wave periodization is a form of non-linear progression where there are constant
                    jumps in intensity, not just forward but also backwards. This gives the athlete
                    more time at a given intensity range while also exposing them to more jumps in
                    intensity. For example, 6 weeks of wave training can look like 60%, 70%, 80%,
                    65%, 75%, 85%.
                  </Text>
                </Group>
              </Group>
              <Group direction="column">
                <Group direction="column">
                  <Title order={3}>Step Loading</Title>
                  <Text>
                    Where other progressions tend to change load each session, its the opposite for
                    step loading periodization. When applying this to a program, an athlete would
                    perform a movement at the same load / percentage for multiple weeks, staying
                    with the same set and rep scheme, or maybe slightly increasing volume. Once the
                    athlete has progressed at the specific intensity, a small jump in load occurs
                    and the process is repeated. This is benefitial for movements where load
                    threshold is hard to increase weekly, maybe for smaller muscle groups or
                    isolation movements.
                  </Text>
                </Group>
              </Group>
            </Group>
          </Group>
        </Container>

        <Group
          direction="column"
          position="left"
          sx={(theme) => ({
            position: 'fixed',
            '@media (max-width: 1650px)': {
              display: 'none',
            },
          })}
        >
          <Group direction="row" position="left">
            <ThemeIcon>
              <AiOutlineUnorderedList />
            </ThemeIcon>
            <Text>Table of Contents</Text>
          </Group>
          <List
            listStyleType="disc"
            styles={{
              item: { cursor: 'pointer' },
            }}
          >
            <List.Item onClick={() => scrollIntoView()}>Key Definitions</List.Item>
            <List.Item onClick={() => scrollIntoPR()}>Foundational Principles</List.Item>

            <List.Item onClick={() => scrollIntoPeriodization()}>Periodization</List.Item>

            <List.Item onClick={() => scrollIntoView()}>Program Design</List.Item>
          </List>
        </Group>
      </div>
    </Layout>
  );
}
