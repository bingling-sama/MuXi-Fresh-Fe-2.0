/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import { get } from '../../../../../fetch.ts';
import { CommentType } from '../../../types';

interface SubmitJudgedProps {
  submissionID: string;
}
interface CommentMobileProps {
  comments: CommentType[];
}

const SubmitJudged: React.FC<SubmitJudgedProps> = (props) => {
  const { submissionID } = props;
  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    get(`/task/submitted/${submissionID}/comment`).then((res) => {
      console.log(res.data);
      setComments(res.data.comments as CommentType[]);
    }, null);
  }, [submissionID]);
  return (
    <>
      <CommentMobile comments={comments}></CommentMobile>
    </>
  );
};

export default SubmitJudged;

export const CommentMobile: React.FC<CommentMobileProps> = (props) => {
  const { comments } = props;
  return (
    <>
      <div className={'comments-wrap-mobile'}>
        <div className={'comment-title-mobile'}>{`全部评论 (${comments.length})`}</div>
        <div className="comment-underline-mobile"></div>
        {comments &&
          comments.map((item, index) => {
            return (
              <p key={`${item.content}${index}`}>
                {item.nickname ? item.nickname : '123'}
              </p>
            );
          })}
      </div>
    </>
  );
};
