export interface ReviewFilter {
  grade: string;
  group: Group;
  school: string;
  season: Season;
  status: string;
  year: Year;
}

export enum Group {
  Android = 'Android',
  Backend = 'Backend',
  Design = 'Design',
  Frontend = 'Frontend',
  Product = 'Product',
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
