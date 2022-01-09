import './App.css';
import _ from 'lodash';

function KeyHints(props) {
  return null;
}

function LetterBox(props) {
  return (
    <button key={props.idx} className={'letterbox ' + props.cName}>
      {props.value}
    </button>
  );
}

function renderWordLetter(i, val) {
  return (
    <LetterBox 
      key = {i}
      value = {val}
      cName= 'word' 
      idx = {i} 
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
  //const [name, setName] = useState("");

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input 
          type="text" 
          value={props.value}
          onChange={props.onChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

function renderWordBoxes(wordList) {
  return wordList.map(
    (word, i) => { 
      return (
        <div> 
          <WordBoxes key={i} className = 'words' wordLen='5' attemptId={i} value={word}/>
        </div>
      );});
}

function Board(props) {
  const numAttempts = parseInt(props.numAttempts);
  const turnList = _.fill(Array(numAttempts), '');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted`);
  }

  const onChange = (e) => {
    console.log(e.target.value);
  }


  return (
    <div>
      <div className='board'>
        {renderWordBoxes(turnList)}
      </div>
      <TurnInput 
        className="input" 
        handleSubmit = {(e) => handleSubmit(e)}
        onChange= {(e) => onChange(e)}>
        </TurnInput>
    </div>
  );
}

function App() {

  return (
    <div className="game">
      <div className='board'>
        <Board 
          numAttempts = '6'
        />
      </div>
      <div className='keyHints'>
        <KeyHints/>
      </div>
    </div>
  );
}

export default App;
