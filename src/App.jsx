import { useEffect, useState } from 'react';
import CurrencyConverter from './CurrencyConverter';

function App() {
  const [currencyOpt, setCurrencyOpt] = useState([]);
  const [fromCurr, setFromCurr] = useState();
  const [toCurr, setToCurr] = useState();
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(); 
  const [exchangeRate, setExchangeRate] = useState();
  const [amountInFromCurr, setAmountInFrom] = useState(true);

  const baseURL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_xQfU5i62m4gmJVhtDjrSXfVFiycoVH6nLdgdD79a";
  
  useEffect(() => {
    fetch(baseURL)
      .then(res => res.json())
      .then(data => {
        const currencyOptions = Object.keys(data.data);
        setCurrencyOpt(currencyOptions);
        setFromCurr(currencyOptions[0]);
        setToCurr(currencyOptions[1]);
        setExchangeRate(data.data[currencyOptions[0]]);
      })
      .catch(error => console.error('Error fetching currency options:', error));
  }, []);

  useEffect(() => {
    if (exchangeRate) {
      if (amountInFromCurr) {
        setToAmount(fromAmount * exchangeRate);
      } else {
        setFromAmount(toAmount / exchangeRate);
      }
    }
  }, [fromAmount, toAmount, exchangeRate, amountInFromCurr]);

  function handleFromAmountChange(e) {
    setFromAmount(e.target.value);
    setAmountInFrom(true);
  }

  function handleToAmountChange(e) {
    setToAmount(e.target.value);
    setAmountInFrom(false);
  }

  return (
    <div className='container'>
      <h1 className='heading'>Currency Converter</h1>
      <CurrencyConverter
        currencyOption={currencyOpt}
        selectedCurr={fromCurr}
        onchangeCurr={e => setFromCurr(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <p>=</p>
      <CurrencyConverter
        currencyOption={currencyOpt}
        selectedCurr={toCurr}
        onchangeCurr={e => setToCurr(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
