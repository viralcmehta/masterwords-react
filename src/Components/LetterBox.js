import React from 'react';
import './css/LetterBox.css';

function LetterBox(props) {
  // const countRef = useRef(0);
  // const componentName = 'LetterBox';
  // console.log(`Render ${componentName} (${props.cName}-${props.ikey}) ${countRef.current++}` );

  return <div className={'w3-round-large letterbox ' + props.cName}>{props.value}</div>;
}

const LetterBoxMemo = React.memo(LetterBox);

export default LetterBoxMemo;
