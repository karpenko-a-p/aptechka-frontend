import React from 'react';

export default function Loading() {
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
