import type { Country, YearRow } from '../types';

export interface DataYear {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
  cumulative_cement_co2?: number;
  cumulative_luc_co2?: number;
  [key: string]: number | undefined;
}

export interface DataCountry {
  iso_code?: string;
  region?: string;
  data: DataYear[];
}

export interface AllDataset {
  [countryName: string]: DataCountry;
}

export async function fetchCo2Data(): Promise<Country[]> {
  const response = await fetch('/owid-co2-data.json');
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);

  const raw: AllDataset = await response.json();

  return Object.entries(raw).map(([name, { iso_code, region, data }]) => ({
    name,
    iso_code,
    region: region ?? 'Unknown',
    years: data.map<YearRow>((y) => ({ ...y })),
  }));
}
