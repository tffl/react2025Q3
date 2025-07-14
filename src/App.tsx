import { Component } from 'react';
import MovieApp from './components/movieApp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Movies search</h1>
        <MovieApp />
      </div>
    );
  }
}

export default App;
