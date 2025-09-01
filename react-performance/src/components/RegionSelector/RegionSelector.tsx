import type { FC } from 'react';
import styles from './RegionSelector.module.css';

interface RegionFilter {
  region: string[];
  value: string;
  onChange: (region: string) => void;
}

const RegionFilter: FC<RegionFilter> = ({ region, value, onChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Region</label>
      <select className={styles.select} value={value} onChange={handleChange}>
        <option value="all">All</option>
        {region.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionFilter;
