import React, { useState, useEffect } from 'react';
import HomePreview from './homePreview';
import HomeComment from './comment';
import './index.less';
import WriteComment from './writeComment';
import { useLocation } from 'react-router-dom';
import { CommentType, TableType } from '../../../types';
import { message } from 'antd';
import { get, post } from '../../../../../services/fetch';

const HomeworkJudge: React.FC = () => {
  const [Comment, setComment] = useState<CommentType[]>([]);
  const [SubmitID, setSubmitID] = useState<string>('');
  const navi = useLocation();
  const infoItem: TableType = navi.state as TableType;
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (SubmitID) handleCommentRequest();
  }, [SubmitID]);
  const handleCommentRequest = () => {
    get(`/task/submitted/${SubmitID}/comment`).then((res) => {
      const comments = res.data?.comments;
      comments && setComment(comments as CommentType[]);
    });
  };
  const handleSubmit = (e: string) => {
    post(`/task/submitted/${SubmitID}/comment`, {
      content: e,
    }).then(() => {
      message.success('评论已提交');
      handleCommentRequest();
    });
  };
  const handleGetSubmittion = (str: string) => {
    setSubmitID(str);
  };
  return (
    <div className="judge-wrap">
      <div className="preview">
        <HomePreview getSubmittionID={handleGetSubmittion} info={infoItem}></HomePreview>
      </div>
      <div className="comment-write">
        <WriteComment onCommentSubmit={handleSubmit}></WriteComment>
        <HomeComment CommentData={Comment}></HomeComment>
      </div>
    </div>
  );
};

export default HomeworkJudge;
