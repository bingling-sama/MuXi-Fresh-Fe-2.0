import React, { useEffect, useState } from 'react';
import { get } from '../../../../../fetch.ts';
import { backType, cmtType, CommentType, TaskInfoType } from '../../../types';
import { Avatar, List } from 'antd';
import { TitleTag } from '../../adminMode/judge/comment';
import './index.less';
import ReactDOM from 'react-dom';
import { AvatarWrap } from '../../../components/selector-mobile';
import FileLink from '../../../components/files';

interface SubmitJudgedProps {
  submissionID: string | undefined;
  uploadHistory: string[] | undefined;
  currentTaskInfo: TaskInfoType | undefined;
}
interface CommentMobileProps {
  comments: CommentType[];
}
interface ModalMobileProps {
  children?: React.ReactNode;
}
type CheckhomeMobileProps = Omit<SubmitJudgedProps, 'submissionID'>;
const SubmitJudged: React.FC<SubmitJudgedProps> = (props) => {
  const { submissionID, uploadHistory, currentTaskInfo } = props;
  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    get(`/task/submitted/${submissionID as string}/comment`).then(
      (res: backType<cmtType>) => {
        setComments(res.data.comments.reverse());
      },
      null,
    );
  }, [submissionID]);
  return (
    <>
      <CheckHomeworkMobile
        uploadHistory={uploadHistory}
        currentTaskInfo={currentTaskInfo}
      ></CheckHomeworkMobile>
      <h2 style={{ textAlign: 'center' }}>作业已批改，无法修改</h2>
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
            const { content, avatar } = item;
            return (
              <List.Item className={'comment-list-item-mobile'} key={index}>
                <div className={'comment-list-item-title-mobile'}>
                  <Avatar
                    size={'large'}
                    src={
                      avatar
                        ? avatar
                        : 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
                    }
                  />
                  <div className={'right-sec'}>
                    <TitleTag
                      className={'comment-list-item-tag-mobile'}
                      item={item}
                    ></TitleTag>
                    <div className={'comment-content-mobile'}>{content}</div>
                  </div>
                </div>
              </List.Item>
            );
          })}
      </div>
    </>
  );
};
export const CheckHomeworkMobile: React.FC<CheckhomeMobileProps> = (props) => {
  const { uploadHistory, currentTaskInfo } = props;
  const Children: React.ReactNode = (
    <>
      <h2 className={'homework-pre-head-mobile'}>{currentTaskInfo?.title_text}</h2>
      <AvatarWrap style={{ width: '100%' }}></AvatarWrap>
      <div className={'homework-pre-mobile'}>{currentTaskInfo?.content}</div>
      <FileLink
        title={'附件:'}
        className={'file-pre-mobile'}
        data={uploadHistory}
      ></FileLink>
      <div className={'back-button'} onClick={() => Modal.close()}>
        返 回
      </div>
    </>
  );
  return (
    <>
      <div className={'check-home-work-wrap'}>
        {currentTaskInfo?.title_text}
        <div className={'check-homework-button'} onClick={() => Modal.open(Children)}>
          查看
        </div>
      </div>
    </>
  );
};

export const ModalMobile: React.FC<ModalMobileProps> = (props) => {
  const { children } = props;
  const handleClick = () => {
    Modal.close();
  };
  return (
    <>
      <div className={'modal-hover-mobile'} onClick={handleClick}></div>
      <div className={'modal-modal-mobile'}>{children}</div>
    </>
  );
};
export const Modal = {
  _modalContainer: null as HTMLDivElement | null,

  open: (children?: React.ReactNode) => {
    if (!Modal._modalContainer) {
      Modal._modalContainer = document.createElement('div');
      document.body.appendChild(Modal._modalContainer);
    }

    ReactDOM.render(<ModalMobile children={children} />, Modal._modalContainer);
  },

  close: () => {
    if (Modal._modalContainer) {
      Modal._modalContainer.classList.add('blur-off');
      ReactDOM.unmountComponentAtNode(Modal._modalContainer);
      document.body.removeChild(Modal._modalContainer);
      Modal._modalContainer = null;
    }
  },
};
