import './css/KeyHints.css';
import LetterBox from './LetterBox';
import { keyboardLayout } from './../utils/gameLogic';
import _ from 'lodash';
import React, { useRef } from 'react';
import ButtonBox from './ButtonBox';

function renderkeyHintLetter(id, char, color) {
  let clr = color;
  if (char === '') {
    clr = 'empty';
  }

  return (
    <ButtonBox
      value={char}
      cName={'keyHint ' + clr + (char.match(/[a-z]/i) ? '' : ' function')}
      ikey={id}
      key={id}
    />
  );
}

function getEmptyColorMap() {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ⌫↵'.split('');
  return _.zipObject(alphabet, Array(28).fill('default'));
}

function getColorMapFromTurns(turns) {
  var fullList = [];
  var colorMap = getEmptyColorMap();

  turns.forEach((t) => {
    var listCharColor = _.zip(t.word.split(''), t.colors);
    fullList = [...fullList, ...listCharColor];
    return;
  });

  fullList.forEach((p) => {
    let ch = p[0];
    let co = p[1];

    if (co === 'green') {
      //blindly upgrade the color
      colorMap[ch] = co;
    } else if (co === 'yellow') {
      if (colorMap[ch] !== 'green') {
        //upgrade only if current val is not green
        colorMap[ch] = co;
      }
    } else if (co === 'grey') {
      //upgrade only if current color is empty
      if (colorMap[ch] === 'default') {
        colorMap[ch] = co;
      }
    }
  });
  return colorMap;
}

function renderKeyHintsRow(row, id, colorMap) {
  return (
    <div className={'keyHint row'} key={10 * id}>
      {row.map((k, i) => renderkeyHintLetter(10 * id + i, k, colorMap[k]))}
    </div>
  );
}

function KeyHints(props) {
  const countRef = useRef(0);
  const componentName = 'KeyHints';
  console.log(`Render ${componentName} ${countRef.current++}`);

  //Generate letter states
  let colorMap = getColorMapFromTurns(props.turns);
  return (
    <div className="keyHints-row-container">
      {keyboardLayout.map((r, i) => renderKeyHintsRow(r, i, colorMap))}
    </div>
  );
}

const KeyHintsMemo = React.memo(KeyHints);
export default KeyHintsMemo;
