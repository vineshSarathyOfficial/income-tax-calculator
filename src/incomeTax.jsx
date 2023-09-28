import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { ToWords } from 'to-words';
import CurrencyInput from 'react-currency-input-field';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export default function IncomeTaxCalculator() {
  const [regime, setRegime] = React.useState('new');
  const [errorMessage, setErrorMessage] = useState('');
  const [className, setClassName] = useState('');
  const [rawValue, setRawValue] = useState('');
  const [result, setResult] = useState(false);
  const [slab, setSlab] = useState('Nill');
  const [calculateValue, setCalculateValue] = useState(0);
//  for checking
  const validateValue = (value) => {
    const rawValue = value === undefined ? undefined : value;
    setRawValue(rawValue || '');

    if (!value) {
      setClassName('');
    } else if (Number.isNaN(Number(value))) {
      setClassName('is-invalid');
    } else {
      setClassName('is-valid');
    }
  };
  const onOptionChange = (e) => {
    setRegime(e.target.value);
  };

  const checkPercentage = () => {
    if (rawValue === '' || rawValue === undefined) {
      setErrorMessage('Please Enter Your Salary');
      return;
    }
    let value = '';
    if (regime === 'old') {
      if (rawValue <= 250000) {
        value = 'Nill';
      } else if (rawValue <= 500000) {
        value = '5%';
      } else if (rawValue <= 1000000) {
        value = '20%';
      } else {
        value = '30%';
      }
    } else {
      if (rawValue <= 250000) {
        value = 'Nill';
      } else if (rawValue <= 500000) {
        value = '5%';
      } else if (rawValue <= 750000) {
        value = '10%';
      } else if (rawValue <= 1000000) {
        value = '15%';
      } else if (rawValue <= 1250000) {
        value = '20%';
      } else if (rawValue <= 1500000) {
        value = '25%';
      } else {
        value = '30%';
      }
    }
    setSlab(value);
    if (value !== 'Nill') {
      let data = Number(value.slice(0, -1)) / 100;
      data = rawValue * data;
      data = rawValue - data;
      setCalculateValue(data);
    } else {
      setCalculateValue(rawValue);
    }
    setResult(true);
  };
  const toWords = new ToWords();
  return (
    <div>
      <Container fluid className="parentContainer">
        <div className="Calculator-Component">
          <h1 style={{ textAlign: 'center' }}>Income Tax Calculator</h1>
          {!result ? (
            <div className="calculation-part">
              <br />
              <h4 className="sub-header">Please Select the regime</h4>
              <div className="d-flex">
                <input
                  type="radio"
                  name="topping"
                  value="new"
                  id="new"
                  checked={regime === 'new'}
                  onChange={onOptionChange}
                />
                <label htmlFor="new">New regime</label>
              </div>
              <div className="d-flex">
                <input
                  type="radio"
                  name="topping"
                  value="old"
                  id="old"
                  checked={regime === 'old'}
                  onChange={onOptionChange}
                />
                <label htmlFor="old">Old Regime</label>
              </div>
              <br />
              <h4 className="sub-header">Enter your annual Income</h4>
              <CurrencyInput
                id="validation-example-2-field"
                placeholder="₹1,234,567"
                allowDecimals={false}
                maxLength={10}
                className={`form-control ${className}`}
                onValueChange={validateValue}
                prefix={'₹'}
                step={10}
              />
              <p className="error">{errorMessage}</p>
              <br />
              <button class="btn fourth" onClick={() => checkPercentage()}>
                Calulate
              </button>
            </div>
          ) : (
            <div className="result-part">
              <h4>Annual Salary without Tax</h4>
              <p className="valueAmount">
                {toWords.convert(rawValue, {
                  currency: true,
                  ignoreDecimal: true,
                })}{' '}
                (₹{rawValue})
              </p>

              <br />
              <h4>
                Your Coming under the slab of:{' '}
                <span className="valueAmount">{slab} </span>
              </h4>
              <br />
              <h4>After Tax your annual Income will be</h4>
              <p className="valueAmount">
                {toWords.convert(calculateValue, {
                  currency: true,
                  ignoreDecimal: true,
                })}{' '}
                (₹{calculateValue})
              </p>
              <br />
              <button
                class="btn fourth"
                onClick={() => {
                  setResult(false);
                  setRawValue('');
                  setErrorMessage('');
                }}
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
