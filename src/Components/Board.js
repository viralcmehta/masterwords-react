import { useMemo, useRef } from 'react';
import './css/Board.css'
import TurnComponent  from './TurnComponent';
import TurnInput from './TurnInput';

function renderWordBoxes(turns, maxTurns) {
  const emptyturn = { word: '     ', colors: Array(5).fill('default') };

  let turnList = [...turns, ...Array(maxTurns).fill(emptyturn)].slice(0, maxTurns);

  const boxes = turnList.map(
    (turn, i) => {
      return (
        <div key={i}>
          <TurnComponent
            className='words'
            wordLen='5'
            attemptId={i}
            turn={turn} />
        </div>
      );
    });
    return boxes;
}

function Board(props) {
  const countRef = useRef(0);
  const componentName = 'Board';
  console.log(`Render ${componentName} ${countRef.current++}` );

  const numAttempts = parseInt(props.numAttempts);
  const boxes = useMemo(() => renderWordBoxes(props.turns, numAttempts), 
            [props.turns, numAttempts]);

  return (
    <div>
      <div className='board'>
        {boxes}
      </div>
      <TurnInput
        className="input"
        value={props.turnInputValue}
        handleSubmit={(e) => props.handleSubmit(e)}
        onChange={(e) => props.onChange(e)}
        resetBoard={props.resetBoard}>
      </TurnInput>
    </div>
  );
}

export default Board;