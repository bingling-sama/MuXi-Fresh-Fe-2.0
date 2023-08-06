import React, { useCallback, useMemo } from 'react';
import { Season, Year, YearSeason } from '../../ReviewFitler.ts';
import './ReviewYear.less';
import { Select } from 'antd';

type ReviewYearProps = {
  changeYear(value: YearSeason): void;
};

const ReviewYear: React.FC<ReviewYearProps> = ({ changeYear }) => {
  const years = useMemo(() => [Year.Y2022, Year.Y2023], []);
  const seasons = useMemo(() => [Season.Spring, Season.Autumn], []);
  const chineseSeasons = {
    [Season.Spring]: '春招',
    [Season.Autumn]: '秋招',
  };
  const getYear = useCallback((year: Year, season: Season): YearSeason => {
    return `${year}${season}`;
  }, []);

  const handleChange = useCallback(
    (value: YearSeason) => {
      changeYear(value);
    },
    [changeYear],
  );

  return (
    <div className="reviewYear">
      <Select
        defaultValue="2023年秋招"
        style={{ width: '80%' }}
        onSelect={(value: string) => {
          handleChange(value as YearSeason);
        }}
        options={years.flatMap((year) =>
          seasons.map((season) => ({
            value: getYear(year, season),
            label: `${year}年${chineseSeasons[season]}`,
          })),
        )}
      />
    </div>
  );
};

export default ReviewYear;
