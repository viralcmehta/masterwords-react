import { useRef, useState } from 'react';
import './css/TurnInput.css';

function TurnInput(props) {
  const countRef = useRef(0);
  const componentName = 'TurnInput';
  //console.log(`Render ${componentName} ${countRef.current++}` );

  var [holder, setHolder] = useState('Enter 5 letter word');

  function handleOnFocus(e) {
    setHolder('');
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
          onChange={(e) => props.onChange(e)}
        />
        <input type="submit" value="Submit" style={{ marginRight: '10px' }} />
        <input type="button" value="Reset Board" onClick={props.resetBoard} />
      </form>
    </div>
  );
}

export default TurnInput;
