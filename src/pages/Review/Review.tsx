import './Review.less';
import { useEffect, useState } from 'react';
import { post } from '../../fetch.ts';
import { ReviewList, ReviewRow } from './ReviewList.ts';
import ReviewYear from './components/ReviewYear/ReviewYear.tsx';
import { Group, ReviewFilter, Season, Year, YearSeason } from './ReviewFitler.ts';
import ReviewGroupSelect from './components/ReviewGroupSelect/ReviewGroupSelect.tsx';
import ReviewTable from './components/ReviewTable/ReviewTable.tsx';
import { message } from 'antd';

const Review = () => {
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>({
    grade: '',
    group: Group.Product,
    school: '',
    season: Season.Autumn,
    status: '',
    year: Year.Y2023,
  });

  const changeYear = (value: YearSeason) => {
    if (value) {
      setReviewFilter((preReviewFilter) => ({
        ...preReviewFilter,
        year: Number(value.slice(0, 4)),
        season: value.slice(4) as Season,
      }));
    }
  };

  const changeGroup = (group: Group) => {
    setReviewFilter((preReviewFilter) => ({
      ...preReviewFilter,
      group: group,
    }));
  };

  const [reviewList, setReviewList] = useState<ReviewRow[]>([]);
  useEffect(() => {
    post('/review/', reviewFilter).then(
      (r: ReviewList) => {
        const { rows } = r.data;
        setReviewList(rows);
      },
      (e) => {
        void message.error('获取审阅列表失败，请稍后重试');
        console.error(e);
      },
    );
  }, [reviewFilter]);

  return (
    <div className={'reviewContent'}>
      <div className={'reviewGroup'}>
        <ReviewYear changeYear={changeYear} />
        <ReviewGroupSelect reviewFilter={reviewFilter} changeGroup={changeGroup} />
      </div>
      <div className={'reviewList'}>
        <ReviewTable reviewList={reviewList}></ReviewTable>
      </div>
    </div>
  );
};
export default Review;
