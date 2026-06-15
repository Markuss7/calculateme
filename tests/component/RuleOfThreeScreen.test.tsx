import { fireEvent, render, screen } from '@testing-library/react';
import { RuleOfThreeScreen } from '../../src/features/rule-of-three/RuleOfThreeScreen';

function renderScreen() {
  render(<RuleOfThreeScreen />);
}

describe('F5 RuleOfThreeScreen', () => {
  it('renders base value, percentage, calculate button, and a read-only result field', () => {
    renderScreen();

    expect(screen.getByLabelText(/base value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/percentage/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/result/i)).toHaveAttribute('readonly');
  });

  it('starts with an empty result', () => {
    renderScreen();

    expect(screen.getByLabelText(/result/i)).toHaveValue('');
  });

  it('calculates a percentage of the base value on tap', () => {
    renderScreen();

    fireEvent.change(screen.getByLabelText(/base value/i), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText(/percentage/i), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(screen.getByLabelText(/result/i)).toHaveValue('50');
  });

  it('supports recalculation after input changes', () => {
    renderScreen();

    fireEvent.change(screen.getByLabelText(/base value/i), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText(/percentage/i), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
    expect(screen.getByLabelText(/result/i)).toHaveValue('50');

    fireEvent.change(screen.getByLabelText(/base value/i), { target: { value: '80' } });
    fireEvent.change(screen.getByLabelText(/percentage/i), { target: { value: '100' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(screen.getByLabelText(/result/i)).toHaveValue('80');
  });

  it('formats decimal results cleanly', () => {
    renderScreen();

    fireEvent.change(screen.getByLabelText(/base value/i), { target: { value: '12.5' } });
    fireEvent.change(screen.getByLabelText(/percentage/i), { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(screen.getByLabelText(/result/i)).toHaveValue('1.25');
  });

  it('calculates when pressing Enter in an input field', () => {
    renderScreen();

    fireEvent.change(screen.getByLabelText(/base value/i), { target: { value: '120' } });
    fireEvent.change(screen.getByLabelText(/percentage/i), { target: { value: '25' } });
    fireEvent.keyDown(screen.getByLabelText(/percentage/i), { key: 'Enter', code: 'Enter' });

    expect(screen.getByLabelText(/result/i)).toHaveValue('30');
  });

  it('announces result changes through a live region', () => {
    renderScreen();

    expect(screen.getByTestId('result-region')).toHaveAttribute('aria-live', 'polite');
  });

  it('shows base value validation feedback for invalid input', () => {
    renderScreen();

    fireEvent.change(screen.getByLabelText(/base value/i), { target: { value: 'abc' } });
    fireEvent.change(screen.getByLabelText(/percentage/i), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(screen.getByText('Enter a valid base value')).toBeInTheDocument();
    expect(screen.getByLabelText(/base value/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/result/i)).toHaveValue('');
  });

  it('shows percentage validation feedback for missing input', () => {
    renderScreen();

    fireEvent.change(screen.getByLabelText(/base value/i), { target: { value: '200' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(screen.getByText('Enter a percentage')).toBeInTheDocument();
    expect(screen.getByLabelText(/percentage/i)).toHaveAttribute('aria-invalid', 'true');
  });
});