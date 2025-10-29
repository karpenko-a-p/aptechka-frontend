'use client';

import React, { FC, forwardRef } from 'react';
import cn from 'clsx';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Лэйбл
   */
  label: string;
  /**
   * Тип инпута
   */
  type?: 'text' | 'password' | 'number';
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
   * Недоступно
   */
  disabled?: boolean;
  /**
   * Обязательность
   */
  required?: boolean;
};

/**
 * Поле ввода
 */
export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, className, type = 'text', invalid, errorMessage, description, ...restProps } = props;

  return (
    <div className={cn(className, 'input')}>
      <label>
        {/*Лэйбл*/}
        <span>{label}</span>

        {/*Инпут*/}
        <input type={type} ref={ref} aria-invalid={invalid} {...restProps} />
      </label>

      {/*Описание*/}
      {description && <p className="input-description">{description}</p>}

      {/*Сообщение ошибки*/}
      {invalid && errorMessage && <p className="input-error">{errorMessage}</p>}
    </div>
  );
});
