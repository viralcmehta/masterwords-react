import { easyList } from './easyList';
import { mediumList } from './mediumList';
import { hardList } from './hardList';

const keyboardLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['↵', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

const wordListsbyDifficulty = {
  easy: easyList,
  medium: mediumList,
  hard: hardList,
};

function getGameStatus(turns, targetWord, maxAttempts) {
  console.log(turns);
  const lastElement = turns.length - 1;

  if (
    turns.length > 0 &&
    turns[lastElement] &&
    turns[lastElement].word === targetWord
  ) {
    return 'winner';
  }
  if (turns.length >= maxAttempts) {
    return 'loser';
  }
  return 'inprogress';
}

function validateWord(word, difficulty) {
  if (word.length !== 5) {
    return `${word} is longer than 5 letters`;
  }
  const lowerW = word.toLowerCase();
  const validWordList = wordListsbyDifficulty[difficulty];

  if (
    !validWordList.some((x) => {
      return x === lowerW;
    })
  ) {
    return `${word} is not a valid word`;
  }

  //Check other validations here;

  return '';
}

function chooseRandomWord(difficulty) {
  const rnd = Math.floor(
    Math.random() * wordListsbyDifficulty[difficulty].length,
  );
  return wordListsbyDifficulty[difficulty][rnd].toUpperCase();
}

function evaluateWord(word, target) {
  let cw = word.toLowerCase().split('');
  let tgt = target.toLowerCase().split('');

  //Loop through the letters
  //do 2 passes
  //green pass - if cw[i] == tgt[i], then out[i] = 'green'
  //remove the letters from cw and tgt
  //yellow pass - if cw[i] is in tgt, out[i] = 'yellow', remove tgt[x]
  //

  let out = Array(cw.length).fill('grey');

  //green pass
  for (let i = 0; i < cw.length; i++) {
    if (cw[i] !== ' ' && tgt[i] !== ' ' && cw[i] === tgt[i]) {
      out[i] = 'green';
      cw[i] = tgt[i] = ' ';
    }
  }

  //yellow pass
  for (let i = 0; i < cw.length; i++) {
    //skip this letter if ' ', it was found in the green pass
    if (cw[i] !== ' ') {
      //find the current letter in all the remaining letters in target
      //if found, then replace the letter in target by ' ', and add 'yellow' to
      //the output. else continue
      let t = tgt.findIndex((c) => cw[i] === c);
      if (t >= 0) {
        //findIndex returns -1 if not found
        tgt[t] = ' ';
        out[i] = 'yellow';
      }
    }
  }

  return out;
}

export {
  chooseRandomWord,
  evaluateWord,
  validateWord,
  getGameStatus,
  wordListsbyDifficulty,
  keyboardLayout,
};
