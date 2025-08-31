import type { FC } from 'react';
import type { Country, YearRow } from '../../MockData';
import styles from './CountryTable.module.css';

interface CountryTable {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
}

const formatNumber = (value?: number): string =>
  value == null || Number.isNaN(value)
    ? 'N/A'
    : Math.abs(value) >= 1_000_000_000
      ? `${(value / 1_000_000_000).toFixed(2)}B`
      : Math.abs(value) >= 1_000_000
        ? `${(value / 1_000_000).toFixed(2)}M`
        : Math.abs(value) >= 1_000
          ? `${(value / 1_000).toFixed(0)}`
          : value.toString();

const tableCell = (value: number | string | undefined) =>
  (value ?? 'N/A').toString();

const CountryTable: FC<CountryTable> = ({
  countries,
  selectedYear,
  selectedColumns,
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {[
            'Country',
            'ISO',
            'Region',
            'Population',
            'CO₂',
            'CO₂ / cap',
            ...selectedColumns,
          ].map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => {
          const row: YearRow | undefined = country.years.find(
            (y) => y.year === selectedYear
          );

          const tableCells = [
            country.name,
            country.iso_code ?? '—',
            country.region ?? '—',
            formatNumber(row?.population),
            tableCell(row?.co2),
            tableCell(row?.co2_per_capita),
            ...selectedColumns.map((col) => tableCell(row?.[col])),
          ];

          return (
            <tr key={country.iso_code ?? country.name}>
              {tableCells.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CountryTable;
