import React, { type FC, forwardRef } from 'react';
import cn from 'clsx';
import { IconCheck } from '@tabler/icons-react';

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Сообщение об ошибке
   */
  errorMessage?: string;
  /**
   * Ошибка
   */
  invalid?: boolean;
  /**
   * Недоступно
   */
  disabled?: boolean;
  /**
   * Обязательность
   */
  required?: boolean;
  /**
   * Дочерние компоненты
   */
  children?: React.ReactNode;
  /**
   * Установлен
   */
  checked?: boolean;
};

export const Radio: FC<RadioProps> = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { className, children, checked, invalid = false, errorMessage, disabled = false, ...restProps } = props;

  return (
    <div className={cn('radio', className)}>
      <label>
        <input type="radio" disabled={disabled} checked={checked} aria-invalid={invalid} ref={ref} {...restProps} />

        {/*Кружок*/}
        <div className="radio-circle">
          <IconCheck className="radio-icon" />
        </div>

        {/*Наименование*/}
        {children}
      </label>

      {/*Текст ошибки*/}
      {invalid && errorMessage && <p className="radio-error">{errorMessage}</p>}
    </div>
  );
});
