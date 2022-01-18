import _ from 'lodash';
import { useState } from 'react';
import './App.css';
import {validateWord, chooseRandomWord, evaluateWord, keyboardLayout} from './gameLogic'

function LetterBox(props) {
  return (
    <button className={'letterbox ' + props.cName} key={props.ikey} >
      {props.value}
    </button>
  );
}

function renderkeyHintLetter(id, char, color) {
  let clr = color;
  if(char === '') {
    clr = 'empty';
  }

  return (
    <LetterBox 
      value = {char}
      cName= {'word ' + clr} 
      ikey = {id}
      key = {id}
    />
  );
}

function renderWordLetter(id, char, color) {
  return (
    <LetterBox 
      value = {char}
      cName= {'word ' + color} 
      ikey = {id}
      key = {id}
    />
  );
}

function WordBoxes(props) {
  const charClrs = _.zip(props.turn.word.split(''), props.turn.colors)
  return (
    <div>
      {
        charClrs.map( (cc, i) => {
          return (
            renderWordLetter(i, cc[0], cc[1])
          ); })
      }
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

function renderWordBoxes(turns, maxTurns) {
  const emptyturn = {word:'     ', colors:Array(5).fill('default')}; 

  let turnList = [...turns, ...Array(maxTurns).fill(emptyturn)].slice(0,maxTurns);

  return turnList.map(
    (turn, i) => { 
      return (
        <div key = {i}> 
          <WordBoxes 
            className = 'words' 
            wordLen='5' 
            attemptId={i} 
            turn={turn} 
            />
        </div>
      );});

  
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
        value = {props.turnInputValue}
        handleSubmit = {(e) => props.handleSubmit(e)}
        onChange= {(e) => props.onChange(e)}
        resetBoard = {props.resetBoard}>
        </TurnInput>
    </div>
  );
}

function renderKeyHintsRow(row, id, turns) {
  let letters = row.map((k, i) => {
      
      return renderkeyHintLetter(10*id+i, k);
    }
  );

  return (
  <div className={'keyHint row' + id} key = {10*id}>
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

function App() {
  const numTurns = 6;
  const difficulty = 'medium';
  
  const [inputVal, setInputVal] = useState('');
  const [turnWords, setTurnWords] = useState([]);
  const [turns, setTurns] = useState( [] );

  const [targetWord, ] = useState(chooseRandomWord(difficulty));
  console.log(targetWord);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(turnWords.length >= numTurns) {
      return;
    }

    if(!validateWord(inputVal, 'hard')) {
      alert("Invalid Word Submitted!")
      return;
    }

    const colors = evaluateWord(inputVal, targetWord);

    setTurns( [...turns, {word: inputVal, colors: colors}] );

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

export default App;
