import React, { FC } from 'react';
import cn from 'clsx';

export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Значение прогресса
   */
  value: number;
  /**
   * Максимальное число прогресса
   */
  of?: number;
};

/**
 * Полоса прогресса
 */
export const Progress: FC<ProgressProps> = (props) => {
  const { className, of = 100, value, ...restProps } = props;
  const width = `${Math.round((value / of) * 100)}%`;

  return (
    <div className={cn(className, 'progress')} {...restProps}>
      <div className="progress-bar" style={{ width }} />
    </div>
  );
};
