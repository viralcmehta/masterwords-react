import { useState } from 'react';
import './TurnInput.css'

function TurnInput(props) {
  var [holder, setHolder] = useState('Enter 5 letter word');

  function handleOnFocus(e) {
    setHolder("");
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          value={props.value}
          placeholder={holder}
          onFocus={(e) => handleOnFocus(e)}
          onChange={props.onChange} />
        <input type="submit" value="Submit" style={{ 'marginRight': '10px' }} />
        <input type="button" value="Reset Board" onClick={props.resetBoard} />
      </form>
    </div>
  );
}

export default TurnInput;