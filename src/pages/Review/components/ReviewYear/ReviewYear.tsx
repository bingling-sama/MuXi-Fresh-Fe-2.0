import React, { useCallback, useMemo } from 'react';
import { YearSeason } from '../../ReviewFitler.ts';
import './ReviewYear.less';
import { Select } from 'antd';
import { generateYears } from '../../../../utils/GetYearSeason/getReviewYear.ts';

type ReviewYearProps = {
  changeYear(value: YearSeason): void;
};

const ReviewYear: React.FC<ReviewYearProps> = ({ changeYear }) => {
  const years = useMemo(() => generateYears(), []);
  // const seasons = useMemo(() => [Season.Spring, Season.Autumn], []);
  // const chineseSeasons = {
  //   [Season.Spring]: '春招',
  //   [Season.Autumn]: '秋招',
  // };
  // const getYear = useCallback((year: Year, season: Season): YearSeason => {
  //   return `${year}${season}`;
  // }, []);

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
        options={years}
      />
    </div>
  );
};

export default ReviewYear;
