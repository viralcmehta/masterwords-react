import React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import {validateWord, chooseRandomWord, evaluateWord} from './utils/gameLogic'
import Board from './Components/Board';
import KeyHints from './Components/KeyHints';


function App() {
  const numTurns = 6;
  const difficulty = 'medium';
  
  const [inputVal, setInputVal] = useState('');
  const [turns, setTurns] = useState( [] );

  const [targetWord, ] = useState(chooseRandomWord(difficulty));
  console.log(targetWord);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(turns.length >= numTurns) {
      return;
    }

    if(!validateWord(inputVal, 'hard')) {
      alert("Invalid Word Submitted!")
      return;
    }

    const colors = evaluateWord(inputVal, targetWord);

    setTurns( [...turns, {word: inputVal, colors: colors}] );
    setInputVal('');
  }

  const onChange = (e) => {
    e.preventDefault();
    setInputVal(e.target.value.toUpperCase());
  }

  const resetBoard = () => {
    setInputVal("");
    setTurns([]);
  }

  return (
    <div className="game">
      <div className='board'>
        <Board 
          numAttempts = {numTurns}
          turns = {turns}
          turnInputValue = {inputVal}
          onChange = {(e) => onChange(e)}
          handleSubmit = {(e) => handleSubmit(e)}
          resetBoard = {() => resetBoard()}
          difficulty = {difficulty}
        />
      </div>
      <div>
        <KeyHints
          turns = {turns}
        />
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

