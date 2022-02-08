import _ from 'lodash';
import React, { useRef } from 'react';
import './css/TurnComponent.css';
import LetterBox from './LetterBox';

function renderTurnLetter(id, char, color) {
  return <LetterBox value={char} cName={'word ' + color} ikey={id} key={id} />;
}

function TurnComponent(props) {
  const countRef = useRef(0);
  const componentName = 'TurnComponent';
  console.log(
    `Render ${componentName}-${props.attemptId} ${countRef.current++}`,
  );

  const charClrs = _.zip(props.turn.word.split(''), props.turn.colors);
  return (
    <div className="turnComponent">
      <div />
      <div />
      <div />
      {charClrs.map((cc, i) => {
        return renderTurnLetter(i, cc[0], cc[1]);
      })}
      <div />
      <div />
      <div />
    </div>
  );
}

const TurnComponentMemo = React.memo(
  TurnComponent,
  ({ turn: prev }, { turn: next }) => {
    if (next.word === prev.word) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
  },
);

export default TurnComponentMemo;
