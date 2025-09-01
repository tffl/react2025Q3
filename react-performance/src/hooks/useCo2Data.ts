import { useEffect, useState } from 'react';
import type { Country, YearRow } from '../types';

interface RawCountryData {
  country: string;
  iso_code?: string;
  region?: string;
  data: Record<string, number | undefined> & { year: number }[];
}

export function useCo2Data() {
  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/owid-co2-data.json');
        const raw: Record<string, RawCountryData> = await res.json();

        const countries: Country[] = Object.values(raw).map(
          ({ country, iso_code, region, data }) => ({
            name: country,
            iso_code,
            region: region ?? 'Unknown',
            years: data.map<YearRow>((y) => ({ ...y })),
          })
        );

        setData(countries);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}
