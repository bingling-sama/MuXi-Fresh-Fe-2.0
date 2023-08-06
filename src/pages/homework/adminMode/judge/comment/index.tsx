import React, { HTMLAttributes, useState, useEffect } from 'react';
import { List, Card, Avatar, Tag } from 'antd';
import './index.less';
import Title from '../../../components/pages/title';
import { CommentType } from '../../../../../types';
const { Meta } = Card;
interface CommentProps {
  CommentData: CommentType[];
}
const HomeComment: React.FC<HTMLAttributes<HTMLDivElement> & CommentProps> = (props) => {
  const { CommentData, ...restProps } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [CommentData]);
  return (
    <div {...restProps}>
      <Card
        className="comment-card"
        title={
          <Title title="评论区" style={{ marginLeft: '0' }}>
            评论区
          </Title>
        }
      >
        <List
          dataSource={CommentData}
          className="comment-wrap"
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: '90%', margin: 'auto' }} loading={loading}>
                <Meta
                  avatar={
                    <Avatar
                      src={
                        item.avatar
                          ? item.avatar
                          : 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
                      }
                    />
                  }
                  title={item.nickname ? item.nickname : 'admin'}
                  description={item.content}
                />
                <Tag color="orange" className="comment-tag">
                  {item.group.length > 8 ? item.group.slice(-8) : item.group}
                </Tag>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default HomeComment;
