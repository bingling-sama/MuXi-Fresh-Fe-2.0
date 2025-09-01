import './Review.less';
import { useEffect, useState } from 'react';
import { post } from '../../fetch.ts';
import { AdmissionStatus, ExamStatus, Gender, ReviewList, ReviewRow } from './ReviewList.ts';
import ReviewYear from './components/ReviewYear/ReviewYear.tsx';
import { Group, ReviewFilter, Season, YearSeason } from './ReviewFitler.ts';
import ReviewGroupSelect from './components/ReviewGroupSelect/ReviewGroupSelect.tsx';
import ReviewTable from './components/ReviewTable/ReviewTable.tsx';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getCurrentSeason } from '../../utils/GetYearSeason/getReviewYear.ts';

const Review = () => {
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>({
    grade: '',
    group: Group.Product,
    school: '',
    season: getCurrentSeason(),
    status: '',
    year: new Date().getFullYear(),
  });
  const [reviewList, setReviewList] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    setLoading(true);
    post('/review/', { ...reviewFilter })
      .then((r: ReviewList) => {
        const { rows } = r.data;
        setReviewList(rows);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (Number(e.message) === 10003) {
          void message.error('您无此权限，请退出！').then(() => {
            navigate('/app');
          });
        } else {
          void message.error('获取审阅列表失败，请稍后重试');
          console.error(e);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewFilter]);
  
  

  return (
    <div className={'reviewContent'}>
      <div className={'reviewGroup'}>
        <ReviewYear changeYear={changeYear} />
        <ReviewGroupSelect reviewFilter={reviewFilter} changeGroup={changeGroup} />
      </div>
      <div className={'reviewList'}>
        <ReviewTable reviewList={reviewList} loading={loading} />
      </div>
    </div>
  );
};

export default Review;
