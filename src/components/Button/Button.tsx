import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ');

  return (
    <button {...props} className={classes} type={type}>
      {children}
    </button>
  );
}