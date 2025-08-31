import { useMemo, useState, type FC } from 'react';
import styles from './MainPage.module.css';

import YearSelector from '../components/YearSelector/YearSelector';
import RegionFilter from '../components/RegionSelector/RegionSelector';
import SearchBar from '../components/SearchBar/SearchBar';
import SortFilter from '../components/SortTable/SortTable';
import ColumnsModal from '../components/ColumnsModal/ColumnsModal';
import CountryTable from '../components/CountryTable/CountryTable';
import Footer from '../components/Footer/Footer';

import { type Country, MOCK_COUNTRIES, uniq } from '../MockData';

export const MainPage: FC = () => {
  const countries = useMemo(() => MOCK_COUNTRIES, []);
  const allYears = useMemo(
    () =>
      uniq(countries.flatMap((c) => c.years.map((y) => y.year))).sort(
        (a, b) => b - a
      ),
    [countries]
  );

  const [year, setYear] = useState<number>(allYears[0]);
  const [region, setRegion] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [sortField, setSortField] = useState<'name' | 'population'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [columnsModalOpen, setColumnsModalOpen] = useState(false);
  const [extraColumns, setExtraColumns] = useState<string[]>([]);

  const regions = useMemo(
    () => uniq(countries.map((c) => c.region ?? 'Unknown')).filter((r) => r),
    [countries]
  );

  const availableExtraColumns = useMemo(
    () =>
      uniq(
        countries.flatMap((c) => c.years.flatMap((y) => Object.keys(y)))
      ).filter(
        (k) => !['year', 'population', 'co2', 'co2_per_capita'].includes(k)
      ),
    [countries]
  );

  const filteredCountries = useMemo(() => {
    let result = [...countries];

    if (region !== 'all')
      result = result.filter((c) => (c.region ?? 'Unknown') === region);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }

    const populationAtYear = (c: Country) =>
      c.years.find((y) => y.year === year)?.population ?? 0;

    result.sort((a, b) => {
      if (sortField === 'name')
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      return sortDirection === 'asc'
        ? populationAtYear(a) - populationAtYear(b)
        : populationAtYear(b) - populationAtYear(a);
    });

    return result;
  }, [countries, year, region, search, sortField, sortDirection]);

  const toggleSortDirection = () =>
    setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
  const toggleExtraColumn = (col: string) =>
    setExtraColumns((cols) =>
      cols.includes(col) ? cols.filter((c) => c !== col) : [...cols, col]
    );
  const resetExtraColumns = () => setExtraColumns([]);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>CO₂ Emissions Data Viewer</h2>

      <div className={styles.controls}>
        <YearSelector year={allYears} value={year} onChange={setYear} />
        <RegionFilter region={regions} value={region} onChange={setRegion} />
        <SearchBar value={search} onChange={setSearch} />
        <SortFilter
          sortBy={sortField}
          dir={sortDirection}
          onChange={setSortField}
          onToggleDir={toggleSortDirection}
        />

        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => setColumnsModalOpen(true)}
          >
            Columns
          </button>
          <button className={styles.button} onClick={resetExtraColumns}>
            Reset
          </button>
        </div>
      </div>

      <CountryTable
        countries={filteredCountries}
        selectedYear={year}
        selectedColumns={extraColumns}
      />

      <ColumnsModal
        open={columnsModalOpen}
        onClose={() => setColumnsModalOpen(false)}
        available={availableExtraColumns}
        selected={extraColumns}
        onToggle={toggleExtraColumn}
      />

      <Footer
        courseLink="https://rs.school/courses/reactjs"
        githubLink="https://github.com/tffl"
      />
    </div>
  );
};
