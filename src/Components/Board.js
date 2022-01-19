import './Board.css'
import TurnComponent  from './TurnComponent';
import TurnInput from './TurnInput';

function renderWordBoxes(turns, maxTurns) {
  const emptyturn = { word: '     ', colors: Array(5).fill('default') };

  let turnList = [...turns, ...Array(maxTurns).fill(emptyturn)].slice(0, maxTurns);

  return turnList.map(
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
}

function Board(props) {
  const numAttempts = parseInt(props.numAttempts);

  return (
    <div>
      <div className='board'>
        {renderWordBoxes(props.turns, numAttempts)}
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