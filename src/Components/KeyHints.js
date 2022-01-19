import './KeyHints.css'
import LetterBox from './LetterBox';
import { keyboardLayout } from './../utils/gameLogic';

function renderkeyHintLetter(id, char, color) {
  let clr = color;
  if (char === '') {
    clr = 'empty';
  }

  return (
    <LetterBox
      value={char}
      cName={'word ' + clr}
      ikey={id}
      key={id} />
  );
}

function renderKeyHintsRow(row, id, turns) {
  let letters = row.map((k, i) => {

    return renderkeyHintLetter(10 * id + i, k);
  }
  );

  return (
    <div className={'keyHint row' + id} key={10 * id}>
      {letters}
    </div>
  );
}
function KeyHints(props) {
  //Generate letter states

  let i = 0;
  return (
    <div className='keyHints'>
      {renderKeyHintsRow(keyboardLayout[i], i++, props.turns)}
      {renderKeyHintsRow(keyboardLayout[i], i++, props.turns)}
      {renderKeyHintsRow(keyboardLayout[i], i++, props.turns)}
    </div>
  );
}

export default KeyHints;