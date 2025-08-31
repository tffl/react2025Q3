export interface YearRow {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
  [key: string]: number | string | undefined;
}

export interface Country {
  readonly name: string;
  readonly iso_code?: string;
  readonly region?: string;
  readonly years: ReadonlyArray<YearRow>;
}

export const MOCK_COUNTRIES: ReadonlyArray<Country> = [
  {
    name: 'Canada',
    iso_code: 'CAN',
    region: 'Americas',
    years: [
      { year: 2018, population: 37_000_000, co2: 550, co2_per_capita: 14.8 },
      {
        year: 2019,
        population: 37_600_000,
        co2: 560,
        co2_per_capita: 14.9,
        methane: 2.1,
      },
      { year: 2020, population: 38_000_000, co2: 540, co2_per_capita: 14.2 },
    ],
  },
  {
    name: 'India',
    iso_code: 'IND',
    region: 'Asia',
    years: [
      {
        year: 2018,
        population: 1_350_000_000,
        co2: 2500,
        co2_per_capita: 1.85,
      },
      {
        year: 2019,
        population: 1_360_000_000,
        co2: 2600,
        co2_per_capita: 1.91,
        oil_co2: 150,
      },
      {
        year: 2020,
        population: 1_370_000_000,
        co2: 2700,
        co2_per_capita: 1.97,
      },
    ],
  },
  {
    name: 'Germany',
    iso_code: 'DEU',
    region: 'Europe',
    years: [
      { year: 2018, population: 83_000_000, co2: 750, co2_per_capita: 9.0 },
      { year: 2019, population: 83_200_000, co2: 740, co2_per_capita: 8.9 },
      {
        year: 2020,
        population: 83_400_000,
        co2: 700,
        co2_per_capita: 8.4,
        temperature_change_from_co2: 0.1,
      },
    ],
  },
  {
    name: 'Australia',
    iso_code: 'AUS',
    region: 'Oceania',
    years: [
      { year: 2018, population: 25_000_000, co2: 400, co2_per_capita: 16 },
      { year: 2019, population: 25_200_000, co2: 410, co2_per_capita: 16.2 },
      {
        year: 2020,
        population: 25_400_000,
        co2: 395,
        co2_per_capita: 15.5,
        methane: 1.8,
      },
    ],
  },
];

export const uniq = <T>(arr: ReadonlyArray<T>): T[] => Array.from(new Set(arr));

export const formatNumber = (value?: number): string =>
  value == null || Number.isNaN(value)
    ? 'N/A'
    : Math.abs(value) >= 1_000_000_000
      ? `${(value / 1_000_000_000).toFixed(2)}B`
      : Math.abs(value) >= 1_000_000
        ? `${(value / 1_000_000).toFixed(2)}M`
        : Math.abs(value) >= 1_000
          ? `${(value / 1_000).toFixed(0)}`
          : value.toString();
