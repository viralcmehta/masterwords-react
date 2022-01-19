import './KeyHints.css'
import LetterBox from './LetterBox';
import { keyboardLayout } from './../utils/gameLogic';
import _ from 'lodash'

function renderkeyHintLetter(id, char, color) {
  let clr = color;
  if (char === '') {
    clr = 'empty';
  }

  return (
    <LetterBox
      value={char}
      cName={'keyHint ' + clr}
      ikey={id}
      key={id} />
  );
}

function getEmptyColorMap() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  return _.zipObject(alphabet, Array(26).fill('default'));
}

function getColorMapFromTurns(turns) {
  var fullList = [];
  var colorMap = getEmptyColorMap();

  turns.forEach(t => {
    var listCharColor = _.zip(t.word.split(''), t.colors);
    fullList = [...fullList, ...listCharColor];
    return;
  });

  fullList.forEach(p => {
    let ch = p[0];
    let co = p[1];

    if (co === 'green') {
      //blindly upgrade the color
      colorMap[ch] = co;
    }
    else if (co === 'yellow') {
      if (colorMap[ch] !== 'green') {
        //upgrade only if current val is not green
        colorMap[ch] = co;
      }
    } else if (co === 'grey') {
      //upgrade only if current color is empty
      if(colorMap[ch] === 'default') {
        colorMap[ch] = co;
      };
    }
  });
  return colorMap;
}

function renderKeyHintsRow(row, id, colorMap) {
  return (
    <div className={'keyHint row' + id} key={10 * id}>
      {row.map((k, i) => renderkeyHintLetter(10 * id + i, k, colorMap[k]))}
    </div>
  );
}

function KeyHints(props) {
  //Generate letter states
  let colorMap = getColorMapFromTurns(props.turns);
  return (
    <div className='keyHints'>
      {keyboardLayout.map( (r, i) => renderKeyHintsRow(r, i, colorMap))}
    </div>
  );
}

export default KeyHints;