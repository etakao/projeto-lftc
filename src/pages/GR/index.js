import React, { useState } from 'react';

import './styles.scss';

export default function GR() {
  const iteration = 0;
  const alphabet = [...'SABCDEFGHIJKLMNOPQRTUVWXYZ'];
  const [inputs, setInputs] = useState(0);
  const [entrys, setEntrys] = useState(1);

  function validateGrammar(grammar, input) {
    let auxArray = new Map();
    grammar.map((item, value) => {
      if (auxArray.get(item[0]) !== undefined)
        auxArray.set(item[0], `${auxArray.get(item[0])}${item[1]}|`);
      else
        auxArray.set(item[0], `${item[1]}|`);
    })
    auxArray.forEach((value, key, map) => {
      auxArray.set(key, value.substr(0, value.length - 1));
    })

    let ER = findReplace(auxArray.get('S'), auxArray);
    while (ER != findReplace(ER, auxArray)) {
      ER = findReplace(ER, auxArray);
    }

    ER = ER.replace("ε", "\\b");
    ER = ER.replace("λ", "\\b");

    var regexp = new RegExp(ER)

    return regexp.test(input);
  }

  function findReplace(input, grammar) {
    let i = 0;
    let newString = input;
    while (i < input.length) {
      if (grammar.has(input[i])) {
        newString = newString.replace(input[i], `(${grammar.get(input[i])})`);
      }
      i++;
    }

    return newString;
  }

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
        <button type='button'>Adicionar regra</button>
        <button type='reset'>Limpar</button>
      </div>
      <div className='gr-rules'>
        <label htmlFor='rule-input'>S</label>
        <img src='/images/right-arrow.png' alt='Seta p/ direita' />
        <input id='rule-input' />
      </div>
    </div>
  );
}
