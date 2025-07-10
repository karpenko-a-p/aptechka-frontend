import React, { type JSX } from 'react';

export default function Loading(): JSX.Element {
  return (
    <div className="container flex flex-col gap-4 my-4">
      <div className="skeleton" />
      <div className="skeleton" />
      <div className="skeleton" />
      <div className="skeleton" />
      <div className="skeleton" />
    </div>
  );
}
