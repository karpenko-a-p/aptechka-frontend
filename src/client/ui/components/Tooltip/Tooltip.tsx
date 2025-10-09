'use client';

import React, { Children, FC, JSX, useEffect, useLayoutEffect, useRef } from 'react';
import { useBoolean, useTransition } from 'client/hooks';
import cn from 'clsx';

/**
 * Положение
 */
export const enum Placement {
  Top,
  Right,
  Bottom,
  Left,
}

export type TooltipProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Триггер
   */
  children: JSX.Element;
  /**
   * Сообщение подсказки
   */
  message: string;
  /**
   * Положение
   */
  placement?: Placement;
};

/**
 * Подсказка
 */
export const Tooltip: FC<TooltipProps> = (props) => {
  const { children, message, placement = Placement.Top, className, ...restProps } = props;
  const componentRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { value: isOpen, setTrue: open, setFalse: close, toggle } = useBoolean();
  const { rendered, visible } = useTransition({ state: isOpen, time: 100 });
  const component = Children.only(children);

  // Установка положения
  useLayoutEffect(() => {
    if (!rendered) return;

    const trigger = componentRef.current;
    const tooltip = tooltipRef.current;

    if (!tooltip || !trigger) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    switch (placement) {
      case Placement.Top:
        tooltipRef.current.style.top = triggerRect.top - tooltipRect.height + 'px';
        tooltipRef.current.style.left =
          triggerRect.left + Math.round(triggerRect.width / 2 - tooltipRect.width / 2) + 'px';
        break;
      case Placement.Bottom:
        tooltipRef.current.style.top = triggerRect.bottom + 'px';
        tooltipRef.current.style.left = triggerRect.left + Math.round(triggerRect.width / 2) + 'px';
        break;
      case Placement.Left:
        tooltipRef.current.style.top =
          triggerRect.top + Math.round(triggerRect.height / 2 - tooltipRect.height / 2) + 'px';
        tooltipRef.current.style.left = triggerRect.left - tooltipRect.width + 'px';
        break;
      case Placement.Right:
        tooltipRef.current.style.top =
          triggerRect.top + Math.round(triggerRect.height / 2 - tooltipRect.height / 2) + 'px';
        tooltipRef.current.style.left = triggerRect.right + 'px';
        break;
    }
  }, [rendered]);

  // Скрытие подсказки при прокрутке
  useEffect(() => {
    document.addEventListener('scroll', close);

    return (): void => document.removeEventListener('scroll', close);
  }, []);

  if (!component) return null;

  return (
    <>
      {React.cloneElement(component, {
        ref: componentRef,
        onMouseEnter: open,
        onTouchStart: toggle,
        onMouseLeave: close,
      })}
      {rendered && (
        <div className={cn('tooltip', className)} ref={tooltipRef} data-open={visible} {...restProps}>
          <div className="bg-white shadow-sm rounded-lg p-2">
            <p className="text-sm text-black">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};
