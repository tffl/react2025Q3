import type { ChangeEvent } from 'react';

type searchBarStates = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

function SearchBar({ value, onChange, onSubmit }: searchBarStates) {
  return (
    <form className="search-form" onSubmit={e => (e.preventDefault(), onSubmit())}>

      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={value}
        onChange={onChange} />

      <button type="submit" className="search-btn">Search</button>
    </form>
  );
}

export default SearchBar;