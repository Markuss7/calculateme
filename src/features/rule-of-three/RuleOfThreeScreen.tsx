import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { calculateRuleOfThree, formatResult } from './calculate';
import { parseInputs } from './validation';
import './rule-of-three.css';

export function RuleOfThreeScreen() {
  const [baseValue, setBaseValue] = useState('');
  const [percentageValue, setPercentageValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [baseError, setBaseError] = useState('');
  const [percentageError, setPercentageError] = useState('');

  const handleBaseChange = (nextValue: string) => {
    setBaseValue(nextValue);
    if (baseError) {
      setBaseError('');
    }
  };

  const handlePercentageChange = (nextValue: string) => {
    setPercentageValue(nextValue);
    if (percentageError) {
      setPercentageError('');
    }
  };

  const handleInputKeyDown = (key: string) => {
    if (key === 'Enter') {
      handleCalculate();
    }
  };

  const handleCalculate = () => {
    const validation = parseInputs(baseValue, percentageValue);

    const nextBaseError = validation.errors.find((error) => error.toLowerCase().includes('base')) ?? '';
    const nextPercentageError =
      validation.errors.find((error) => error.toLowerCase().includes('percentage')) ?? '';

    setBaseError(nextBaseError);
    setPercentageError(nextPercentageError);

    if (!validation.valid || validation.baseValue === null || validation.percentage === null) {
      setResultValue('');
      return;
    }

    const nextResult = calculateRuleOfThree(validation.baseValue, validation.percentage);
    setResultValue(formatResult(nextResult));
  };

  return (
    <section className="wireframe" aria-labelledby="rule-of-three-title">
      <div className="wireframe__card">
        <h1 className="wireframe__title" id="rule-of-three-title">
          Rule of three
        </h1>
        <div className="wireframe__rows">
          <div className="wireframe__row">
            <label className="sr-only" htmlFor="base-value">
              Base value
            </label>
            <input
              id="base-value"
              className="wireframe__input wireframe__input--main"
              aria-describedby={baseError ? 'base-value-error' : undefined}
              aria-invalid={baseError ? 'true' : undefined}
              inputMode="decimal"
              onChange={(event) => handleBaseChange(event.target.value)}
              onKeyDown={(event) => handleInputKeyDown(event.key)}
              placeholder="200"
              type="text"
              value={baseValue}
            />
            <span aria-hidden="true" className="wireframe__eq">
              =
            </span>
            <span className="wireframe__fixed">100 %</span>
          </div>

          <div className="wireframe__row">
            <label className="sr-only" htmlFor="result-value">
              Result
            </label>
            <div data-testid="result-region" aria-live="polite" className="wireframe__result-wrap">
              <input
                id="result-value"
                className="wireframe__input wireframe__input--main"
                placeholder="Result"
                readOnly
                type="text"
                value={resultValue}
              />
            </div>
            <span aria-hidden="true" className="wireframe__eq">
              =
            </span>
            <label className="sr-only" htmlFor="percentage-value">
              Percentage
            </label>
            <div className="wireframe__percent-wrap">
              <input
                id="percentage-value"
                className="wireframe__input wireframe__input--percent"
                aria-describedby={percentageError ? 'percentage-value-error' : undefined}
                aria-invalid={percentageError ? 'true' : undefined}
                inputMode="decimal"
                onChange={(event) => handlePercentageChange(event.target.value)}
                onKeyDown={(event) => handleInputKeyDown(event.key)}
                placeholder="25"
                type="text"
                value={percentageValue}
              />
              <span aria-hidden="true" className="wireframe__percent-sign">
                %
              </span>
            </div>
          </div>

          {baseError || percentageError ? (
            <div className="wireframe__errors" role="status" aria-live="polite">
              {baseError ? (
                <p className="wireframe__error" id="base-value-error">
                  {baseError}
                </p>
              ) : null}
              {percentageError ? (
                <p className="wireframe__error" id="percentage-value-error">
                  {percentageError}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="wireframe__action">
          <Button className="wireframe__button" onClick={handleCalculate}>
            Calculate
          </Button>
        </div>
      </div>
    </section>
  );
}