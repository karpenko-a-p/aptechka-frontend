'use client';

import React, { FC, forwardRef, ReactElement } from 'react';
import cn from 'clsx';
import { IconSelector } from '@tabler/icons-react';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  /**
   * Плэйсхолдер
   */
  placeholder?: string;
  /**
   * Содержит ошибку
   */
  invalid?: boolean;
  /**
   * Сообщение об ошибке
   */
  errorMessage?: string;
  /**
   * Описание
   */
  description?: string;
  /**
   * Лэйбл
   */
  label: string;
  /**
   * Варианты
   */
  children: ReactElement<HTMLOptionElement>[];
};

export const Select: FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { className, children, errorMessage, invalid = false, description, label, ...restProps } = props;

  return (
    <div className={cn('select', className)}>
      <label>
        {/*Лэйбл*/}
        <span>{label}</span>

        {/*Селект*/}
        <select ref={ref} {...restProps} aria-invalid={invalid}>
          {children}
        </select>

        {/*Иконка заглушка*/}
        <IconSelector />
      </label>

      {/*Описание*/}
      {description && <p className="select-description">{description}</p>}

      {/*Сообщение ошибки*/}
      {invalid && errorMessage && <p className="select-error">{errorMessage}</p>}
    </div>
  );
});
