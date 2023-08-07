import { Card, ConfigProvider, Input, message } from 'antd';
import React, { ChangeEvent, HTMLAttributes, useState, useEffect } from 'react';
import Submit from '../../../../components/button';
import Title from '../../../../components/title';
import './index.less';
const { TextArea } = Input;

interface WriteCommentProps {
  onCommentSubmit?: (e: string) => void;
  onValueChange?: (e: string) => void;
}
const WriteComment: React.FC<HTMLAttributes<HTMLDivElement> & WriteCommentProps> = (
  props,
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [text, settext] = useState<string>('');
  const { onCommentSubmit, onValueChange, ...restProps } = props;
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 1000);
  }, []);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    settext(value);
    onValueChange && onValueChange(value);
  };
  const handleClick = () => {
    if (text) {
      onCommentSubmit && onCommentSubmit(text);
    } else {
      message.error('评论内容为空');
    }
    settext('');
  };
  return (
    <div {...restProps}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#F79B2E',
          },
        }}
      >
        <Card
          title={<Title title="评语" style={{ marginLeft: 0 }}></Title>}
          className="write-comment-wrap"
          loading={loading}
        >
          <TextArea
            placeholder={'快来发表评论吧'}
            allowClear
            className={'write-comment-input '}
            style={{ resize: 'none' }}
            value={text}
            onChange={handleChange}
          ></TextArea>
          <Submit onClick={handleClick} className="write-comment-button">
            评论
          </Submit>
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default WriteComment;
