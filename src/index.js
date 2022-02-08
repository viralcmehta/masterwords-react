import React, { useRef } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  validateWord,
  chooseRandomWord,
  evaluateWord,
  getGameStatus,
} from './utils/gameLogic';
import Board from './Components/Board';
import KeyHints from './Components/KeyHints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './w3.css';
import './index.css';
import preval from 'babel-plugin-preval/macro';
import useWindowDimensions from './utils/windowDimensions';

function App() {
  const countRef = useRef(0);
  const componentName = 'App';
  const numTurns = 6;
  const difficulty = 'medium';
  const [inputVal, setInputVal] = useState('');
  const [turns, setTurns] = useState([]);
  const [targetWord, setTargetWord] = useState(chooseRandomWord(difficulty));
  const [gameStatus, setGameStatus] = useState(
    getGameStatus(turns, targetWord, numTurns),
  );

  console.log(`Render ${componentName} ${countRef.current++} gs ${gameStatus}`);
  console.log(targetWord);

  const toastId = React.useRef(null);

  const { height, width } = useWindowDimensions();
  console.log(`Window sz ${width} px x ${height} px`);

  if (gameStatus === 'loser') {
    let toastOptions = {
      autoClose: false,
      type: toast.TYPE.ERROR,
    };
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast(`LOSER: IT WAS ${targetWord}`, toastOptions);
    }
  } else if (gameStatus === 'winner') {
    let toastOptions = {
      autoClose: false,
      type: toast.TYPE.SUCCESS,
    };
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast('WINNER WINNER CHICKEN DINNER', toastOptions);
      console.log(toastId.current);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var val = event.target[0].value;

    let toastOptions = {
      type: toast.TYPE.WARNING,
    };

    if (gameStatus !== 'inprogress') {
      return;
    }

    if (turns.length >= numTurns) {
      toast(`"${val}" is longer than 5 letters.`, toastOptions);
      return;
    }

    let status = validateWord(val, 'hard');
    if (status !== '') {
      toast(status, toastOptions);
      return;
    }

    const colors = evaluateWord(val, targetWord);
    const newTurns = [...turns, { word: val, colors: colors }];
    const gs = getGameStatus(newTurns, targetWord, numTurns);

    console.log(`handleSubmit: gs ${gs}`);
    setGameStatus(gs);

    setTurns(newTurns);
    setInputVal('');
  };

  const onChange = (e) => {
    e.preventDefault();
    if (gameStatus !== 'inprogress') {
      return;
    }
    setInputVal(e.target.value.toUpperCase());
  };

  const resetBoard = () => {
    setInputVal('');
    setTurns([]);
    setGameStatus('inprogress');
    setTargetWord(chooseRandomWord(difficulty));
    toast.dismiss(toastId.current);
    toastId.current = null;
  };

  const buildString = preval`module.exports = new Date().toLocaleString();`;
  const detailString = `${width}px x ${height}px`;
  console.log(navigator.userAgent);

  return (
    <>
      <div className="game">
        <div className="board-input">
          <Board
            numAttempts={numTurns}
            turns={turns}
            turnInputValue={inputVal}
            onChange={(e) => onChange(e)}
            handleSubmit={(e) => handleSubmit(e)}
            resetBoard={() => resetBoard()}
            difficulty={difficulty}
          />
        </div>
        <div className="keyboard">
          <KeyHints turns={turns} />
        </div>
      </div>
      <ToastContainer
        theme="dark"
        autoClose={2500}
        position={toast.POSITION.TOP_CENTER}
      />
      <div id="buildString">
        Build Date: {buildString} <br />
        Details: {detailString}
      </div>
    </>
  );
}

const EnableStrictMode = false;
function renderApp() {
  if (EnableStrictMode) {
    return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    return <App />;
  }
}

ReactDOM.render(renderApp(), document.getElementById('root'));
