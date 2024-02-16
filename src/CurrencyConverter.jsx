import React from 'react'

function CurrencyConverter({ currencyOption , selectedCurr, onchangeCurr , amount, onChangeAmount }) {
    return (
      <>
        <input type='number' value={amount} onChange={onChangeAmount} /> 
        <select value={selectedCurr} onChange={onchangeCurr}>
          {currencyOption && currencyOption.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </>
    );
  }
  
 

export default CurrencyConverter;
