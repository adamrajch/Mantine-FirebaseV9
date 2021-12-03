import Link from 'next/link';
import React, { forwardRef } from 'react';

export const NextLink = forwardRef(
  (
    { href, ...others }: React.ComponentPropsWithoutRef<typeof Link>,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => (
    <Link href={href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a {...others} ref={ref} />
    </Link>
  )
);
