/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import { get } from '../../../../../fetch.ts';
import { CommentType } from '../../../types';
import { List, Avatar } from 'antd';
import { TitleTag } from '../../adminMode/judge/comment';
import './index.less';
import ReactDOM from 'react-dom';
import { AvatarWrap } from '../../../components/selector-mobile';
import FileLink from '../../../components/files';

interface SubmitJudgedProps {
  submissionID: string;
}
interface CommentMobileProps {
  comments: CommentType[];
}
interface ModalMobileProps {
  children?: React.ReactNode;
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
      <CheckHomeworkMobile></CheckHomeworkMobile>
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
            console.log(content);
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
                    <div className={'comment-content-mobile'}>
                      {
                        '管理2后欸u都会从违法和从i2哦hi会从福娃欸是v弄i饿啊who i和2哦i额活动i后iChoi文化·'
                      }
                    </div>
                  </div>
                </div>
              </List.Item>
            );
          })}
      </div>
    </>
  );
};
export const CheckHomeworkMobile: React.FC = () => {
  const handleClick = () => {
    Modal.open(Children);
  };
  const handleTest = () => {
    console.log(123);
  };
  const Children: React.ReactNode = (
    <>
      <div className={'head'} onClick={handleTest}>
        132874
      </div>
      <AvatarWrap style={{ width: '95%' }}></AvatarWrap>
      <div className={'homework-pre-mobile'}></div>
      <FileLink className={'file-pre-mobile'} data={['1', '2', '3']}></FileLink>
      <div className={'back-button'} onClick={() => Modal.close()}>
        返 回
      </div>
    </>
  );
  return (
    <>
      <div className={'check-home-work-wrap'}>
        {'12hiucasbicuwe'}
        <div className={'check-homework-button'} onClick={handleClick}>
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
