import React from "react";
import "./LetterBox.css"

function LetterBox(props) {
  return (
    <div className={'letterbox ' + props.cName} key={props.ikey} >
      {props.value}
    </div>
  );
}

export default LetterBox;