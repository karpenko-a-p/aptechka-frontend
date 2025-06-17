'use client';

import React, { FC, forwardRef, useState } from 'react';
import { IconCheck } from '@tabler/icons-react';
import cn from 'clsx';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Сообщение об ошибке
   */
  errorMessage?: string;
  /**
   * Ошибка
   */
  invalid?: boolean;
};

/**
 * Чекбокс
 */
export const Checkbox: FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    className,
    children,
    checked: outerChecked,
    defaultChecked = false,
    onChange,
    invalid = false,
    errorMessage,
    disabled = false,
    ...restProps
  } = props;

  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const checked = outerChecked ?? innerChecked;
  const handleChange = onChange ?? (() => setInnerChecked(!checked));

  return (
    <div className={cn(className, 'checkbox')}>
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          aria-invalid={invalid}
          onChange={handleChange}
          ref={ref}
          {...restProps}
        />

        {/*Квадрат чекбокса*/}
        <div className="checkbox-rect">
          <IconCheck className="checkbox-icon" />
        </div>

        {/*Наименование*/}
        {children}
      </label>

      {/*Текст ошибки*/}
      {invalid && errorMessage && <p className="checkbox-error">{errorMessage}</p>}
    </div>
  );
});
