import './App.css';
import _ from 'lodash';
import { useState } from 'react';
import {easyList} from './easyList';
import {mediumList} from './mediumList';
import {hardList} from './hardList';

function LetterBox(props) {
  return (
    <button className={'letterbox ' + props.cName} >
      {props.value}
    </button>
  );
}

function renderWordLetter(i, val) {
  return (
    <LetterBox 
      value = {val}
      cName= 'word' 
    />
  );
}

function renderkeyHintLetter(i, val) {
  let state = 'default';
  if(val === '') {
    state = 'empty';
  }

  return (
    <LetterBox
      value = {val}
      cName = {'keyHint ' + state}
      key = {i}
    />
  );
}

function WordBoxes(props) {
  let i = 0;
  const firstFive = props.value.toUpperCase().slice(0,5);
  return (
    <div>
      {renderWordLetter(i, firstFive[i++])}
      {renderWordLetter(i, firstFive[i++])}
      {renderWordLetter(i, firstFive[i++])}
      {renderWordLetter(i, firstFive[i++])}
      {renderWordLetter(i, firstFive[i++])}
    </div>
  );
}

function TurnInput(props) {

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input 
          type="text" 
          value={props.value}
          onChange={props.onChange}
        />
        <input type="submit" value="Submit" style={{'marginRight':'10px'}}/>
        <input type="button" value="Reset Board" onClick={props.resetBoard}/>
      </form>
    </div>
  );
}

function renderWordBoxes(wordList) {
  return wordList.map(
    (word, i) => { 
      return (
        <div key = {i}> 
          <WordBoxes className = 'words' wordLen='5' attemptId={i} value={word}/>
        </div>
      );});
}

function Board(props) {
  const numAttempts = parseInt(props.numAttempts);
  const turnList =  [...props.turnWords, '', '', '', '', '', '',].slice(0,6);
  
  return (
    <div>
      <div className='board'>
        {renderWordBoxes(turnList)}
      </div>
      <TurnInput 
        className="input" 
        value = {props.turnInputValue}
        handleSubmit = {(e) => props.handleSubmit(e)}
        onChange= {(e) => props.onChange(e)}
        resetBoard = {props.resetBoard}>
        </TurnInput>
    </div>
  );
}
function renderKeyHintsRow(row, id) {
  let letters = row.map((k, i) => renderkeyHintLetter(10*id+i, k));
  //console.log(letters);
  return (
  <div className={'keyHint row' + id} key = {10*id}>
    {letters}
  </div>
  );
}

function KeyHints(props) {
  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',],  
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',  '',],
    ['',  'Z', 'X', 'C', 'V', 'B', 'N', 'M', '',   '',],
  ]

  //Generate letter states
  
  let i = 0;
  return (
    <div className='keyHints'>
      {renderKeyHintsRow(keyboard[i], i++)}
      {renderKeyHintsRow(keyboard[i], i++)}
      {renderKeyHintsRow(keyboard[i], i++)}
    </div>
  );
}

const wordListsbyDifficulty = {
  easy: easyList,
  medium: mediumList,
  hard: hardList
};

function validateWord(word, difficulty) {
  if(word.length !=5) {
    return false;
  }
  const lowerW = word.toLowerCase();
  const validWordList = wordListsbyDifficulty[difficulty];

  if(!validWordList.some((x) => {return x === lowerW;})) {
    return false;
  }

  //Check other validations here;
  
  return true;
}

function App() {
  const numTurns = 6;
  const difficulty = 'medium';
  
  const [inputVal, setInputVal] = useState('');
  const [turnWords, setTurnWords] = useState([]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(turnWords.length >= numTurns) {
      return;
    }

    if(!validateWord(inputVal, difficulty)) {
      alert("Invalid Word SUbmitted!")
      return;
    }

    setTurnWords([...turnWords, inputVal]);
    setInputVal('');
  }

  const onChange = (e) => {
    e.preventDefault();
    setInputVal(e.target.value.toUpperCase());
  }

  const resetBoard = () => {
    setInputVal("");
    setTurnWords([]);
  }

  return (
    <div className="game">
      <div className='board'>
        <Board 
          numAttempts = {numTurns}
          turnWords = {turnWords}
          turnInputValue = {inputVal}
          onChange = {(e) => onChange(e)}
          handleSubmit = {(e) => handleSubmit(e)}
          resetBoard = {() => resetBoard()}
          difficulty = {difficulty}
        />
      </div>
      <div>
        <KeyHints/>
      </div>
    </div>
  );
}

export default App;
