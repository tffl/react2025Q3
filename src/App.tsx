import { Component } from 'react';
import MovieApp from './components/movieApp';

class App extends Component {
  state = { shouldThrow: false };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error');
    }

    return (
      <div className="App">
        <button onClick={() => this.setState({ shouldThrow: true })} className="crash-btn">C̴̖̼̬̃̏̓̍Ṝ̸A̷͔͑̋͘S̶̩̼͓̪̄̀́H̵̹̦̺̺͚̎ ̸̲͓̖̠̝̒̀̈̉͘T̷̮̾̇̚ͅḦ̴̤́È̷͙͝͠ ̷̪̂͌̂̓̇Ä̸̲̤̍P̸̤̮͉͛͆̀͊P̶̡͕̯̍</button>
        <h1>Movies search</h1>
        <MovieApp />
      </div>
    );
  }
}

export default App;
