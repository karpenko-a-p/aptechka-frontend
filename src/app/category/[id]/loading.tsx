import { type JSX } from 'react';

export default function Loading(): JSX.Element {
  return (
    <div className="flex flex-col gap-2 container my-4">
      <div className="skeleton h-6 w-1/5" />
      <div className="skeleton" />
      <div className="skeleton" />
      <div className="skeleton" />
      <div className="skeleton" />
    </div>
  );
}
