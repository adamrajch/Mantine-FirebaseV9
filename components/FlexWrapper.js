import { createStyles } from '@mantine/core';

export default function FlexWrapper() {
  const useStyles = createStyles((theme, _params, getRef) => {
    const child = getRef('child');

    return {
      wrapper: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        maxWidth: 400,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: theme.radius.sm,

        // Dynamic media queries, define breakpoints in theme, use anywhere
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
          // Type safe child reference in nested selectors via ref
          [`& .${child}`]: {
            fontSize: theme.fontSizes.xs,
          },
        },
      },

      child: {
        // assign ref to element
        ref: child,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        boxShadow: theme.shadows.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    };
  });
  const { classes } = useStyles();

  return <div className={classes.wrapper}>{children}</div>;
}
