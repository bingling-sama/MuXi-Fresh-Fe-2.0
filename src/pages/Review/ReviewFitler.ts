export interface ReviewFilter {
  group: Group;
  year: Year;
  grade: string;
  school: string;
  status: string;
  season: Season;
}

export enum Group {
  Product = 'Product',
  Frontend = 'Frontend',
  Backend = 'Backend',
  Android = 'Android',
  Design = 'Design',
}

export enum Year {
  Y2022 = 2022,
  Y2023 = 2023,
}

export enum Season {
  Spring = 'spring',
  Autumn = 'autumn',
}

export type YearSeason = `${Year}${Season}`;
