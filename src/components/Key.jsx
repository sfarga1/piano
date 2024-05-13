import React from 'react';
import './Key.css';
import { NOTE_TO_KEY } from '../global/constants';

class Key extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false
    };
  }

  handleKeyUp = () => {
    this.setState({ isPressed: false });
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  noteIsFlat = (note) => {
    return note.length > 1;
  }

  keyIsPressed = () => {
    return this.props.pressedKeys.includes(NOTE_TO_KEY[this.props.note]);
  }

  render() {
    let keyClassName = "key";
    const noteIsFlat = this.noteIsFlat(this.props.note);
    const keyIsPressed = this.keyIsPressed();
    if (noteIsFlat) {
      keyClassName += " flat";
    }
    if (keyIsPressed || this.state.isPressed) {
      keyClassName += " pressed";
    }

    let key;
    if (noteIsFlat) {
      key = <div className={keyClassName}></div>;
    } else {
      key = (
        <div className={keyClassName}>
          <div className="key-text">{this.props.note.toUpperCase()}</div>
        </div>
      );
    }
    return key;
  }
}

export { Key };
