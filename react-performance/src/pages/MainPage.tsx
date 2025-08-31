import { useEffect, useState, useMemo, useCallback, type FC, Suspense, lazy } from "react";
import styles from "./MainPage.module.css";

import YearSelector from "../components/YearSelector/YearSelector";
import SearchBar from "../components/SearchBar/SearchBar";
import SortFilter from "../components/SortTable/SortTable";
import ColumnsModal from "../components/ColumnsModal/ColumnsModal";
import Footer from "../components/Footer/Footer";

import type { Country } from "../types";
import { fetchCo2Data } from "../services/fetchCo2Data";

const CountryTable = lazy(() => import("../components/CountryTable/CountryTable"));

function useFilteredCountries(
  countries: Country[],
  year: number,
  search: string,
  sortField: "name" | "population",
  sortDirection: "asc" | "desc"
) {
  return useMemo(() => {
    let result = [...countries];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q));
    }

    const populationAtYear = (c: Country) => c.years.find(y => y.year === year)?.population ?? 0;

    return result.sort((a, b) =>
      sortField === "name"
        ? (sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
        : (sortDirection === "asc"
          ? populationAtYear(a) - populationAtYear(b)
          : populationAtYear(b) - populationAtYear(a))
    );
  }, [countries, year, search, sortField, sortDirection]);
}

export const MainPage: FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [year, setYear] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<"name" | "population">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [columnsModalOpen, setColumnsModalOpen] = useState(false);
  const [extraColumns, setExtraColumns] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    fetchCo2Data()
      .then(data => {
        if (!mounted) return;
        setCountries(data);
        if (data.length > 0) {
          const allYears = Array.from(new Set(data.flatMap(c => c.years.map(y => y.year)))).sort(
            (a, b) => b - a
          );
          setYear(allYears[0]);
        }
      })
      .catch(err => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : String(err));
      });

    return () => { mounted = false; };
  }, []);

  const filteredCountries = useFilteredCountries(countries, year, search, sortField, sortDirection);

  const availableExtraColumns = useMemo(
    () =>
      Array.from(
        new Set(
          countries.flatMap(c => c.years.flatMap(y => Object.keys(y)))
        )
      ).filter(
        k => !["year", "population", "co2", "co2_per_capita"].includes(k)
      ),
    [countries]
  );

  const toggleSortDirection = useCallback(() => setSortDirection(d => (d === "asc" ? "desc" : "asc")), []);
  const toggleExtraColumn = useCallback(
    (col: string) =>
      setExtraColumns(cols => (cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col])),
    []
  );
  const resetExtraColumns = useCallback(() => setExtraColumns([]), []);

  const years = useMemo(
    () =>
      filteredCountries.length
        ? Array.from(new Set(filteredCountries.flatMap(c => c.years.map(y => y.year)))).sort((a, b) => b - a)
        : [],
    [filteredCountries]
  );

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>☁️ CO₂ Emissions Data Viewer ☁️</h2>

      <div className={styles.controls}>
        <YearSelector year={years} value={year} onChange={setYear} />

        <div className={styles.searchWrapper}>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <SortFilter
          sortBy={sortField}
          dir={sortDirection}
          onChange={setSortField}
          onToggleDir={toggleSortDirection}
        />

        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => setColumnsModalOpen(true)}>Columns</button>
          <button className={styles.button} onClick={resetExtraColumns}>Reset</button>
        </div>
      </div>

      {(error || countries.length === 0) && !filteredCountries.length && (
        <div className={styles.loader}>
          {error ? `Error: ${error}` : "Loading CO₂ data..."}
        </div>
      )}

      {!error && countries.length > 0 && (
        <Suspense fallback={<div className={styles.loader}>Loading table...</div>}>
          <CountryTable
            countries={filteredCountries}
            selectedYear={year}
            selectedColumns={extraColumns}
          />
        </Suspense>
      )}

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
