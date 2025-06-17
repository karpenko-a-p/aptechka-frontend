'use client';

import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'clsx';

import styles from './Drawer.module.scss';
import { useTransition } from 'presentation/hooks';

export type DrawerProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Ширина
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Открыт ли
   */
  open: boolean;
  /**
   * Обработка закрытия
   */
  onClose(): void;
  /**
   * Положение
   */
  placement?: 'left' | 'right' | 'down';
};

/**
 * Боковое меню
 */
export const Drawer: FC<DrawerProps> = (props) => {
  const { size = 'md', children, className, open = false, placement = 'right', onClose, ...restProps } = props;
  const { visible, rendered } = useTransition({ time: 250, state: open });

  // Обрезание окна
  useEffect(() => {
    if (rendered)
      return document.body.classList.add('hidden');

    document.body.classList.remove('hidden');
  }, [rendered]);

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

  if (!rendered)
    return null;

  return createPortal(
    <section
      data-component={Drawer.name}
      data-open={visible}
      onClick={onClose}
      data-placement={placement}
      className={cn(styles.wrapper, className)}
      {...restProps}
    >
      <div className={styles.content} onClick={handleContentClick} data-size={size} data-open={visible}>
        {children}
      </div>
    </section>,
    document.body,
  );
};
