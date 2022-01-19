import React from "react";
import "./LetterBox.css"

function LetterBox(props) {
  return (
    <button className={'letterbox ' + props.cName} key={props.ikey} >
      {props.value}
    </button>
  );
}

export default LetterBox;