import React from 'react';
import './index.less';
import Title from '../../components/title';

const HomeworkVisitorMode: React.FC = () => {
  return (
    <div className="visitor-card">
      <div className="text-wrap">
        <Title title="请先提交报名表" className="visitor-title"></Title>
        <Title title="选择自己喜欢的组别后再来吧QWQ~~"></Title>
      </div>
    </div>
  );
};

export default HomeworkVisitorMode;
