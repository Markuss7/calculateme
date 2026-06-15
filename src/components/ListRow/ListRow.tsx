import type { KeyboardEvent } from 'react';
import './ListRow.css';

interface ListRowProps {
  detail?: string;
  label: string;
  onSelect: () => void;
}

export function ListRow({ detail, label, onSelect }: ListRowProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <button className="list-row" onClick={onSelect} onKeyDown={handleKeyDown} type="button">
      <span className="list-row__copy">
        <span className="list-row__label">{label}</span>
        {detail ? <span className="list-row__detail">{detail}</span> : null}
      </span>
      <span aria-hidden="true" className="list-row__chevron">
        ›
      </span>
    </button>
  );
}