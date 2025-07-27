import { useState } from "react";

import MovieApp from "../../components/MovieApp/MovieApp";
import { Header } from "../../ui-components/Header/Header";

export const PageHome = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Test error");
  }

  return (
    <>
      <Header />
      <div className="App">
        <button
          onClick={() => setShouldThrow(true)}
          className="crash-btn"
        >
          C̴̖̼̬̃̏̓̍Ṝ̸A̷͔͑̋͘S̶̩̼͓̪̄̀́H̵̹̦̺̺͚̎ ̸̲͓̖̠̝̒̀̈̉͘T̷̮̾̇̚ͅḦ̴̤́È̷͙͝͠ ̷̪̂͌̂̓̇Ä̸̲̤̍P̸̤̮͉͛͆̀͊P̶̡͕̯̍
        </button>
        <h1>Movies search</h1>
        <MovieApp />
      </div>
    </>
  );
};