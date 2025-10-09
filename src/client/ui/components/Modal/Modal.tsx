'use client';

import React, { FC, HTMLAttributes, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTransition } from 'client/hooks';
import cn from 'clsx';
import { IS_SERVER } from 'server/constants/side';

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Открыта
   */
  open: boolean;
  /**
   * Закрытие
   */
  onClose: () => void;
  /**
   * Содержимое
   */
  children: ReactNode;
  /**
   * Класс окошка с содержимым
   */
  contentClassName?: string;
};

const preventPropagation = (event: React.MouseEvent<HTMLDivElement>): void => event.stopPropagation();

export const Modal: FC<ModalProps> = (props) => {
  const { children, open, className, contentClassName, onClose, ...restProps } = props;
  const { rendered, visible } = useTransition({ state: open, time: 100 });

  // Обрезание окна
  useEffect(() => {
    if (rendered) return document.body.classList.add('overflow-hidden');
    document.body.classList.remove('overflow-hidden');
  }, [rendered]);

  if (!rendered || IS_SERVER) return null;

  return createPortal(
    <div
      className={cn('modal', className, visible && 'open')}
      {...restProps}
      role="dialog"
      aria-modal={true}
      onClick={onClose}
    >
      <div className={cn('modal-content', contentClassName)} onClick={preventPropagation}>
        {children}
      </div>
    </div>,
    document.body,
  );
};
