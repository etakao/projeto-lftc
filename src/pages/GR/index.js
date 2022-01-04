import React, { useState } from 'react';

import './styles.scss';

export default function GR() {
  const [iteration, setIteration] = useState(0);
  const alphabet = [...'SABCDEFGHIJKLMNOPQRTUVWXYZ'];
  const [grammar, setGrammar] = useState([
    {
      iteration: 0,
      letter: alphabet[iteration],
      rule: ''
    }
  ]);
  const [expression, setExpression] = useState('');
  const [isValid, setIsValid] = useState('');

  function updateRule(index, value) {
    const updtGrammar = [...grammar];
    updtGrammar[index].rule = value;
    setGrammar(updtGrammar);
  }

  function addRule() {
    const newGrammar = grammar.slice();
    newGrammar.push({
      iteration: iteration + 1,
      letter: alphabet[iteration + 1],
      rule: ''
    });
    setGrammar(newGrammar);
    setIteration(iteration + 1);
  }

  function resetGrammar() {
    setGrammar([
      {
        iteration: 0,
        letter: alphabet[0],
        rule: ''
      }
    ]);
    setIteration(0);
  }

  // validar a gramatica com base no input
  function validateGrammar(auxGrammar, input) {
    console.log('validateGrammar');
    let auxArray = new Map();
    auxGrammar.forEach(item => {
      // item[0] => S ou A ou B...
      // item[1] => regra
      auxArray.set(item[0], `${item[1]}`);
    });

    //ER = todas as regras da gramatica
    let ER = findReplace(auxArray.get('S'), auxArray);
    while (ER !== findReplace(ER, auxArray)) {
      ER = findReplace(ER, auxArray);
    }

    ER = ER.replace("ε", "\\b");
    ER = ER.replace("λ", "\\b");

    // talvez precise adicionar o chapeu e o cifrao na ER: ^ER$

    var regexp = new RegExp(ER);

    return regexp.test(input);
  }

  // input: [a, A]
  // grammar: S, A. B...
  //OK
  function findReplace(input, auxGrammar) {
    console.log('findReplace');
    let newString = input;
    for (let i = 0; i < input.length; i++) {
      if (auxGrammar.has(input[i])) {
        newString = newString.replace(input[i], `(${auxGrammar.get(input[i])})`);
      }
      // newString: a, b, c, ε; somente as regras
      return newString;
    }
  }

  // OK
  function validateExpression() {
    console.log('validateExpression');
    let initValue = grammar[0].rule;

    let auxGrammar = [['S', initValue]];

    for (let i = 1; i < grammar.length; i++) {
      let key = grammar[i].letter;
      let value = grammar[i].rule;

      auxGrammar.push([key, value])
    }

    let isGrammarValid = validateGrammar(auxGrammar, expression);

    setIsValid(isGrammarValid);
  }

  return (
    <div className='gr-container'>
      <div className='gr-actions'>
        <button type='button' onClick={addRule}>Adicionar regra</button>
        <button type='reset' onClick={resetGrammar}>Limpar</button>
      </div>
      <div className='gr-rules'>
        {grammar.map((item, index) => (
          <div className='gr-rule' key={index}>
            <label htmlFor='rule-input'>{item.letter}</label>
            <img src='/images/rightArrow.png' alt='Seta p/ direita' />
            <input
              type='texy'
              id='rule-input'
              value={item.rule}
              autoFocus
              onChange={e => updateRule(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className='gr-expression'>
        <label htmlFor='expression-input'>Expressão:</label>
        <div className='input-expression'>
          <input
            id='expression-input'
            type='text'
            className={isValid ? 'valid-expression' : 'invalid-expression'}
            value={expression}
            onChange={e => setExpression(e.target.value)}
          />
          <button
            type='button'
            onClick={validateExpression}
          >
            Testar
          </button>
        </div>
      </div>
    </div>
  );
}
