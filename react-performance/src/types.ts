export interface YearRow {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
  cumulative_cement_co2?: number;
  cumulative_luc_co2?: number;
  ghg_per_capita?: number;
  ghg_excluding_lucf_per_capita?: number;
  land_use_change_co2?: number;
  land_use_change_co2_per_capita?: number;
  methane?: number;
  methane_per_capita?: number;
  nitrous_oxide?: number;
  nitrous_oxide_per_capita?: number;
  [key: string]: number | string | undefined;
}

export interface Country {
  name: string;
  iso_code?: string;
  region?: string;
  years: YearRow[];
}
