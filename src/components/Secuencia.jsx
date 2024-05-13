import React from 'react';
import _ from 'lodash';
import { VALID_KEYS } from '../global/constants';

class Secuencia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secuencia: [],
      userInput: [],
      gameStarted: false,
      gameOver: false,
    };
  }

  generarSecuencia = () => {
    const secuencia = _.times(4, () => _.sample(VALID_KEYS));
    this.setState({
      secuencia: secuencia,
      gameStarted: true,
    });
    this.reproducirSecuencia(secuencia);
  };

  reproducirSecuencia = (secuencia) => {
    secuencia.forEach((tecla, index) => {
      setTimeout(() => {
        this.simularPulsacion(tecla);
      }, 1000 * index);
    });
  };

  simularPulsacion = (tecla) => {
    // Simula la pulsación de la tecla durante un breve período
    // Esto podría ser más avanzado dependiendo de cómo quieras que funcione tu interfaz de usuario
    console.log(`Tecla pulsada: ${tecla}`);
  };

  handleTeclaPulsada = (tecla) => {
    const { secuencia, userInput } = this.state;
    const nextInput = userInput.concat(tecla);
    this.setState({ userInput: nextInput });

    if (_.isEqual(nextInput, secuencia)) {
      // El usuario ha completado la secuencia correctamente
      // Puedes hacer algo aquí como aumentar la longitud de la secuencia y continuar el juego
      console.log('Secuencia completada correctamente');
    } else if (!_.startsWith(secuencia, nextInput)) {
      // El usuario ha fallado en la secuencia
      this.setState({ gameOver: true });
      console.log('Juego terminado');
    }
  };

  render() {
    const { gameStarted, gameOver } = this.state;

    return (
      <div>
        {!gameStarted && !gameOver && (
          <button onClick={this.generarSecuencia}>Comenzar juego</button>
        )}
        {gameOver && <div>¡Has perdido! Intenta de nuevo.</div>}
      </div>
    );
  }
}

export { Secuencia };
