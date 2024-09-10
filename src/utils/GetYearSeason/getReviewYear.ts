import { Season } from '../../pages/Review/ReviewFitler.ts';

const getSeason = (month: number) => (month < 9 ? Season.Spring : Season.Autumn);
export const getCurrentSeason = () => getSeason(new Date().getMonth() + 1);

const chineseSeasons = {
  [Season.Spring]: '春招',
  [Season.Autumn]: '秋招',
};

const generateYearObject = (year: number, season: Season.Spring | Season.Autumn) => ({
  value: `${year}${season}`,
  label: `${year}年${chineseSeasons[season]}`,
});

export const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const currentSeason = getCurrentSeason();
  let years: { value: string; label: string }[] = [];

  for (let year = currentYear - 1; year > currentYear - 4; year--) {
    years = years.concat([
      generateYearObject(year, Season.Autumn),
      generateYearObject(year, Season.Spring),
    ]);
  }

  years.unshift(generateYearObject(currentYear, Season.Spring));

  if (currentSeason === Season.Autumn) {
    years.unshift(generateYearObject(currentYear, Season.Autumn));
  }

  return years;
};
