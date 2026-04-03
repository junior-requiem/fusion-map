import React from 'react';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Button({ className, variant, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={cx('inline-flex items-center rounded-md border border-slate-700 px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-800', variant === 'outline' ? 'bg-transparent' : 'bg-slate-800', className)}
      {...props}
    />
  );
}
