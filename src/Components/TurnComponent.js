import _ from 'lodash';
import "./TurnComponent.css"
import LetterBox from './LetterBox';

function renderTurnLetter(id, char, color) {
  return (
    <LetterBox 
      value = {char}
      cName= {'word ' + color} 
      ikey = {id}
      key = {id}
    />
  );
}

function TurnComponent(props) {
  const charClrs = _.zip(props.turn.word.split(''), props.turn.colors);
  return (
    <div>
      {charClrs.map((cc, i) => {
        return (
          renderTurnLetter(i, cc[0], cc[1])
        );
      })}
    </div>
  );
}

export default TurnComponent;