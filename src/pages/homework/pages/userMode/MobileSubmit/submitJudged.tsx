/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import { get } from '../../../../../fetch.ts';
import { CommentType } from '../../../types';
import { nullFunc } from '../../../utils/deData.ts';
interface SubmitJudgedProps {
  submissionID: string;
}
const SubmitJudged: React.FC<SubmitJudgedProps> = (props) => {
  const { submissionID } = props;
  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    get(`/task/submitted/${submissionID}/comment`).then((res) => {
      console.log(res.data);
      setComments(res.data.comments as CommentType[]);
    }, nullFunc);
  }, [submissionID]);
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

export default SubmitJudged;
