import React, { useEffect, useRef, useState } from 'react';

import './styles.scss';

export default function ER() {
  const [expression, setExpression] = useState('');
  const [inputTest, setInputTest] = useState('');
  const [aux, setAux] = useState(false)
  const [isValid, setIsValid] = useState('');
  const expInputRef = useRef();

  useEffect(() => {
    expInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (aux) {
      if (expression) {
        var regexp = new RegExp(expression);
        if (regexp.test(inputTest)) {
          setIsValid(true);
        } else setIsValid(false);
      }
    }

    // eslint-disable-next-line
  }, [expression, inputTest]);

  return (
    <div className='er-container'>
      <div className='input-box'>
        <label htmlFor='expression'>Expressão:</label>
        <input
          id='expression'
          type='text'
          ref={expInputRef}
          value={expression}
          placeholder='^_expressao_$'
          onChange={e => setExpression(e.target.value)}
          onBlur={() => setAux(true)}
          onFocus={() => setAux(false)}
        />
      </div>
      <div className='input-box'>
        <label htmlFor='test'>Teste:</label>
        <input
          id='test'
          type='text'
          className={expression || inputTest ? (isValid ? 'valid-input' : 'invalid-input') : ''}
          value={inputTest}
          onChange={e => setInputTest(e.target.value)}
        />
      </div>
    </div>
  );
}
