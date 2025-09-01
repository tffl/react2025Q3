import type { FC } from 'react';
import type { Country } from '../../types';
import styles from './CountryTable.module.css';

interface Props {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
}

const CountryTable: FC<Props> = ({
  countries,
  selectedYear,
  selectedColumns,
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Country</th>
          <th>ISO Code</th>
          <th>Population</th>
          <th>CO₂</th>
          <th>CO₂ per Capita</th>
          {selectedColumns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {countries.map((c) => {
          const yearData = c.years.find((y) => y.year === selectedYear);
          return (
            <tr key={c.name}>
              <td>{c.name}</td>
              <td>{c.iso_code ?? '-'}</td>
              <td>{yearData?.population ?? '-'}</td>
              <td>{yearData?.co2 ?? '-'}</td>
              <td>{yearData?.co2_per_capita ?? '-'}</td>
              {selectedColumns.map((col) => (
                <td key={col}>{yearData?.[col] ?? '-'}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CountryTable;
