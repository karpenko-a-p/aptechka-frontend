import React, { FC, forwardRef } from 'react';
import cn from 'clsx';

export type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {
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
   * Установлен
   */
  checked?: boolean;
};

/**
 * Свич
 */
export const Switch: FC<SwitchProps> = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const { className, children, invalid, errorMessage, ...restProps } = props;

  return (
    <div className={cn(className, 'switch')}>
      <label>
        <input type="checkbox" role="switch" aria-invalid={invalid} ref={ref} {...restProps} />

        {/*Отрисовака свича*/}
        <div className="switch-thumb">
          <div className="switch-circle" />
        </div>

        {/*Наименование*/}
        {children}
      </label>

      {/*Текст ошибки*/}
      {invalid && errorMessage && <p className="switch-error">{errorMessage}</p>}
    </div>
  );
});
