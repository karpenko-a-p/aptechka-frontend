'use client';

import React, { ChangeEvent, FC, forwardRef, useState } from 'react';
import cn from 'clsx';
import { IconSelector } from '@tabler/icons-react';

import styles from './Select.module.scss';

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  /**
   * Размер
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Плэйсхолдер
   */
  placeholder?: string;
  /**
   * Содержит ошибку
   */
  hasError?: boolean;
  /**
   * Сообщение об ошибке
   */
  errorMessage?: string;
  /**
   * Описание
   */
  description?: string;
  /**
   * Звезда
   */
  star?: boolean;
  /**
   * Лэйбл
   */
  label?: string;
  /**
   * Выключено
   */
  disabled?: boolean;
};

export const Select: FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    className,
    children,
    size = 'md',
    onChange,
    placeholder,
    disabled = false,
    errorMessage,
    hasError = false,
    description,
    label,
    star = false,
    ...restProps
  } = props;

  const [placeholderVisible, setPlaceholderVisible] = useState(!!placeholder);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (placeholderVisible) setPlaceholderVisible(false);

    onChange?.(event);
  };

  return (
    <section className={cn(styles.wrapper, className)} data-component={Select.name}>
      {/*Лэйбл*/}
      {label && (
        <p className="text-black text-sm" data-start={star}>
          {label}
        </p>
      )}

      {/*Селект*/}
      <div className={styles.select} data-hasError={hasError} data-disabled={disabled} data-size={size}>
        <select
          ref={ref}
          onChange={handleChange}
          disabled={disabled}
          data-placeholder={placeholderVisible}
          {...restProps}
        >
          {/*Плэйсхолдер*/}
          {placeholderVisible && (
            <option disabled={true} selected={true} hidden={true} value="">
              {placeholder}
            </option>
          )}

          {children}
        </select>

        {/*Иконка*/}
        <div className={styles.icon}>
          <IconSelector />
        </div>
      </div>

      {/*Описание*/}
      {description && <p className="secondary text-xs">{description}</p>}

      {/*Сообщение ошибки*/}
      {hasError && errorMessage && <p className="text-xs text-red-400">{errorMessage}</p>}
    </section>
  );
});
