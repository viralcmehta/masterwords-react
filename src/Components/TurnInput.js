import './TurnInput.css'

function TurnInput(props) {

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          value={props.value}
          onChange={props.onChange} />
        <input type="submit" value="Submit" style={{ 'marginRight': '10px' }} />
        <input type="button" value="Reset Board" onClick={props.resetBoard} />
      </form>
    </div>
  );
}

export default TurnInput;