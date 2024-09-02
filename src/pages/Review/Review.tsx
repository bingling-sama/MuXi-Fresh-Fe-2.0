import './Review.less';
import { useEffect, useState } from 'react';
import { post } from '../../fetch.ts';
import { ReviewList, ReviewRow } from './ReviewList.ts';
import ReviewYear from './components/ReviewYear/ReviewYear.tsx';
import { Group, ReviewFilter, Season, YearSeason } from './ReviewFitler.ts';
import ReviewGroupSelect from './components/ReviewGroupSelect/ReviewGroupSelect.tsx';
import ReviewTable from './components/ReviewTable/ReviewTable.tsx';
import { message, Pagination } from 'antd';
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
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页
  const [totalItems, setTotalItems] = useState<number>(0); // 总记录数

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setReviewFilter((preReviewFilter) => ({
      ...preReviewFilter,
      page: page, // 添加页码参数
    }));
  };

  useEffect(() => {
    setLoading(true);
    post('/review/', { ...reviewFilter, page: currentPage })
      .then((r: ReviewList) => {
        const { rows, total } = r.data;
        setReviewList(rows);
        setTotalItems(total); // 更新总记录数
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
  }, [reviewFilter, currentPage]);

  return (
    <div className={'reviewContent'}>
      <div className={'reviewGroup'}>
        <ReviewYear changeYear={changeYear} />
        <ReviewGroupSelect reviewFilter={reviewFilter} changeGroup={changeGroup} />
      </div>
      <div className={'reviewList'}>
        <ReviewTable reviewList={reviewList} loading={loading} />
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={10} // 每页显示的记录数
          onChange={handlePageChange}
          showSizeChanger={false} // 是否显示页面尺寸切换器
        />
      </div>
    </div>
  );
};

export default Review;
