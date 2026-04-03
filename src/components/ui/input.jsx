import React from 'react';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Input({ className, ...props }) {
  return (
    <input
      className={cx('w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500', className)}
      {...props}
    />
  );
}
