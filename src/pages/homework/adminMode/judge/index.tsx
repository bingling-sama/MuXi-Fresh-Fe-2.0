import React from 'react';
import HomePreview from './homePreview';
import Comment from './comment';
import './index.less';
import WriteComment from './writeComment';

const HomeworkJudge: React.FC = () => {
  // const { id } = useParams();

  return (
    <div className="judge-wrap">
      <div className="preview">
        <HomePreview></HomePreview>
      </div>
      <div className="comment-write">
        <WriteComment></WriteComment>
        <Comment></Comment>
      </div>
    </div>
  );
};

export default HomeworkJudge;
