import type { FC } from 'react';
import styles from './YearSelector.module.css';

interface YearSelector {
  year: number[];
  value: number;
  onChange: (year: number) => void;
}

const YearSelector: FC<YearSelector> = ({ year, value, onChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={styles.container}>
      <select className={styles.select} value={value} onChange={handleChange}>
        {year.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
