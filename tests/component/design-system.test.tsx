import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../../src/components/Button/Button';
import { Field } from '../../src/components/Field/Field';
import { ListRow } from '../../src/components/ListRow/ListRow';
import { NavBar } from '../../src/components/NavBar/NavBar';
import App from '../../src/App';

describe('Button', () => {
  it('renders with an accessible name and fires clicks', () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Calculate</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('respects the disabled state', () => {
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Disabled' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('supports the secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);

    expect(screen.getByRole('button', { name: 'Secondary' })).toHaveClass('button--secondary');
  });
});

describe('NavBar', () => {
  it('renders a title and optional back control', () => {
    const onBack = vi.fn();

    render(<NavBar backLabel="Back to dashboard" onBack={onBack} title="Calculator" />);

    fireEvent.click(screen.getByRole('button', { name: 'Back to dashboard' }));

    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});

describe('ListRow', () => {
  it('renders its content and supports click plus keyboard activation', () => {
    const onSelect = vi.fn();

    render(<ListRow detail="Open calculator" label="Rule of three" onSelect={onSelect} />);

    const row = screen.getByRole('button', { name: /rule of three/i });
    fireEvent.click(row);
    fireEvent.keyDown(row, { key: 'Enter' });

    expect(screen.getByText('Open calculator')).toBeInTheDocument();
    expect(onSelect).toHaveBeenCalledTimes(2);
  });
});

describe('Field', () => {
  it('associates labels and errors with the input', () => {
    render(<Field error="Enter a base value" id="base" label="Base value" value="" onChange={() => undefined} />);

    const input = screen.getByLabelText('Base value');

    expect(input).toHaveAttribute('inputmode', 'decimal');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'base-error');
    expect(screen.getByText('Enter a base value')).toHaveAttribute('id', 'base-error');
  });
});

describe('App shell', () => {
  it('renders directly into the calculator screen', () => {
    render(<App />);

    expect(screen.getByText('Rule of three')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Calculate' })).toBeInTheDocument();
    expect(screen.getByLabelText('Base value')).toBeInTheDocument();
  });
});