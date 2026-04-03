import React from 'react';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Card({ className, ...props }) {
  return <div className={cx('rounded-xl border border-slate-800 bg-slate-900', className)} {...props} />;
}

export function CardHeader({ className, ...props }) {
  return <div className={cx('p-6', className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h2 className={cx('text-xl font-semibold text-white', className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cx('p-6 pt-0', className)} {...props} />;
}
