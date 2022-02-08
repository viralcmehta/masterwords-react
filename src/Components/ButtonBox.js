import React from 'react';
import './css/ButtonBox.css';

function ButtonBox(props) {
  // const countRef = useRef(0);
  // const componentName = 'ButtonBox';
  // console.log(`Render ${componentName} (${props.cName}-${props.ikey}) ${countRef.current++}` );

  return (
    <button
      className={'w3-round-large buttonbox ' + props.cName}
      onClick={() => console.log(`Click: ${props.value}`)}
    >
      {props.value}
    </button>
  );
}

const ButtonBoxMemo = React.memo(ButtonBox);

export default ButtonBoxMemo;
