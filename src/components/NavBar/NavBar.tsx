import type { ReactNode } from 'react';
import './NavBar.css';

interface NavBarProps {
  title: string;
  backLabel?: string;
  onBack?: () => void;
  trailing?: ReactNode;
}

export function NavBar({ title, backLabel = 'Back', onBack, trailing }: NavBarProps) {
  return (
    <header className="nav-bar">
      <div className="nav-bar__slot">
        {onBack ? (
          <button aria-label={backLabel} className="nav-bar__back" onClick={onBack} type="button">
            {backLabel}
          </button>
        ) : null}
      </div>
      <h1 className="nav-bar__title">{title}</h1>
      <div className="nav-bar__slot nav-bar__slot--end">{trailing}</div>
    </header>
  );
}