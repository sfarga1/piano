import React from "react";
import { Key } from "./Key";
import './Piano.css';
import {
    NOTES,
    VALID_KEYS,
    KEY_TO_NOTE,
} from "../global/constants";
import _ from 'lodash';

class Piano extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedKeys: [],
            audioFiles: []
        };
    }

    componentDidMount = () => {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);

        // Añadir la lógica para cargar los archivos de audio al estado
        const audioFiles = _.map(NOTES, (note, index) => {
            const audio = new Audio(`../../notes/${note}.mp3`);
            audio.id = note;
            return audio;
        });

        this.setState({ audioFiles });
    }

    playNote = (note) => {
        if (!_.isEmpty(note)) {
            const noteAudio = this.state.audioFiles.find(audio => audio.id === note);
            noteAudio.currentTime = 0;
            noteAudio.play();
        }
    }

    handleKeyDown = (event) => {
        if (event.repeat) {
            return;
        }
        const key = event.key;
        const updatedPressedKeys = [...this.state.pressedKeys];
        if (!updatedPressedKeys.includes(key) && VALID_KEYS.includes(key)) {
            updatedPressedKeys.push(key);
        }
        this.setState({
            pressedKeys: updatedPressedKeys,
        });
        this.playNote(KEY_TO_NOTE[key]);
    }

    handleKeyUp = (event) => {
        const key = event.key;
        const index = this.state.pressedKeys.indexOf(key);
        if (index > -1) {
            const updatedPressedKeys = [...this.state.pressedKeys];
            updatedPressedKeys.splice(index, 1);
            this.setState({
                pressedKeys: updatedPressedKeys
            });
            // Restablecemos el estado de la tecla actualmente presionada en Key
            this.refs[key].setState({ isPressed: false });
        }
    }

    render() {
        const keys = _.map(NOTES, (note, index) => {
            return (
                <Key
                    key={index}
                    note={note}
                    pressedKeys={this.state.pressedKeys}
                    ref={note}
                />
            );
        });

        return (
            <div>
                <div className="piano">
                    {keys}
                </div>
            </div>
        );
    }
}

export { Piano };
