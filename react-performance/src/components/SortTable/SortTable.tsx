import type { FC } from 'react';
import styles from './SortTable.module.css';

interface SortTable {
  sortBy: 'name' | 'population';
  dir: 'asc' | 'desc';
  onChange: (sortBy: 'name' | 'population') => void;
  onToggleDir: () => void;
}

const SortFilter: FC<SortTable> = ({ sortBy, dir, onChange, onToggleDir }) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(e.target.value as 'name' | 'population');
  };

  const getSortLabel = () => {
    if (sortBy === 'name') return dir === 'asc' ? 'A → Z' : 'Z → A';
    return dir === 'asc' ? '↑' : '↓';
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Sort by </label>
      <select className={styles.select} value={sortBy} onChange={handleChange}>
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>
      <button className={styles.button} onClick={onToggleDir}>
        {getSortLabel()}
      </button>
    </div>
  );
};

export default SortFilter;
