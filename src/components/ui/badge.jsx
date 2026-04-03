import React from 'react';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Badge({ className, ...props }) {
  return <span className={cx('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', className)} {...props} />;
}
