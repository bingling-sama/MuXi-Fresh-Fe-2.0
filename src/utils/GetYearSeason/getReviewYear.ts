import { Season } from '../../pages/Review/ReviewFitler.ts';

const getSeason = (month: number) => (month < 9 ? Season.Spring : Season.Autumn);

const chineseSeasons = {
  [Season.Spring]: '春招',
  [Season.Autumn]: '秋招',
};
// const currentMonth = ; // JavaScript中月份从0开始，所以要加1
const geneYearObject = (year: number, season: Season.Spring | Season.Autumn) => ({
  value: `${year}${season}`,
  label: `${year}年${chineseSeasons[season]}`,
});
export const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const currentSeason = getSeason(new Date().getMonth() + 1);
  let years: { value: string; label: string }[] = [];
  for (let year = 2022; year < currentYear; year++) {
    years = years.concat([
      geneYearObject(year, Season.Spring),
      geneYearObject(year, Season.Autumn),
    ]);
  }
  years.push(geneYearObject(currentYear, Season.Spring));
  currentSeason === Season.Autumn &&
    years.push(geneYearObject(currentYear, Season.Spring));
  return years;
};
