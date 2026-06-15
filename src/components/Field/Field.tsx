import type { InputHTMLAttributes } from 'react';
import './Field.css';

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  error?: string;
  id: string;
  label: string;
}

export function Field({ error, inputMode = 'decimal', label, id, ...props }: FieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        {...props}
        aria-describedby={errorId}
        aria-invalid={error ? 'true' : undefined}
        className="field__input"
        id={id}
        inputMode={inputMode}
      />
      {error ? (
        <p className="field__error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}