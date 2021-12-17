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

  // function validateGrammar(grammar, input) {
  //   let auxArray = new Map();
  //   grammar.map((item, value) => {
  //     if (auxArray.get(item[0]) !== undefined)
  //       auxArray.set(item[0], `${auxArray.get(item[0])}${item[1]}|`);
  //     else
  //       auxArray.set(item[0], `${item[1]}|`);
  //   })
  //   auxArray.forEach((value, key, map) => {
  //     auxArray.set(key, value.substr(0, value.length - 1));
  //   })

  //   let ER = findReplace(auxArray.get('S'), auxArray);
  //   while (ER != findReplace(ER, auxArray)) {
  //     ER = findReplace(ER, auxArray);
  //   }

  //   ER = ER.replace("ε", "\\b");
  //   ER = ER.replace("λ", "\\b");

  //   var regexp = new RegExp(ER)

  //   return regexp.test(input);
  // }

  // function findReplace(input, grammar) {
  //   let i = 0;
  //   let newString = input;
  //   while (i < input.length) {
  //     if (grammar.has(input[i])) {
  //       newString = newString.replace(input[i], `(${grammar.get(input[i])})`);
  //     }
  //     i++;
  //   }

  //   return newString;
  // }

  // function validarEntradas() {
  //   let initValue = $('#start-grammar').val();
  //   let grammar = [['S', initValue]];

  //   for (let i = 0; i < entrys; i++) {
  //     let key = $(`#key-${i}`).val();
  //     let value = $(`#value-${i}`).val();

  //     grammar.push([key, value])
  //   }

  //   for (let i = 0; i < inputs; i++) {
  //     let inputValue = $(`#input-${i}`).val();
  //     let result = validateGrammar(grammar, inputValue);

  //     if (result)
  //       $(`#input-${i}`).css("background-color", '#67e480');
  //     else
  //       $(`#input-${i}`).css("background-color", '#e96379');
  //   }
  // }

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
          <input id='expression-input' type='text' />
          <button type='button'>Testar</button>
        </div>
      </div>
    </div>
  );
}
