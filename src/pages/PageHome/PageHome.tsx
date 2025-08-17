import MovieApp from "../../components/MovieApp/MovieApp";
import { Header } from "../../ui-components/Header/Header";

export const PageHome = () => {
  return (
    <>
      <Header />
      <div className="App">
        <h1>Movies search</h1>
        <MovieApp />
      </div>
    </>
  );
};
