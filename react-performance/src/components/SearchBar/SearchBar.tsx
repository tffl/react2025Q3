import type { FC } from 'react';
import styles from './SearchBar.module.css';

interface SearchBar {
  value: string;
  onChange: (search: string) => void;
}

const SearchBar: FC<SearchBar> = ({ value, onChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search country..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
