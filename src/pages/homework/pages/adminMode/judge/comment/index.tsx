import React, { HTMLAttributes, useEffect, useState } from 'react';
import { Avatar, Card, List, Tag } from 'antd';
import './index.less';
import Title from '../../../../components/title';
import { CommentType } from '../../../../types';

const { Meta } = Card;
interface CommentProps {
  CommentData: CommentType[];
}
interface TitleTagProps {
  item: CommentType;
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
                  title={<TitleTag item={item}></TitleTag>}
                  description={item.content}
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default HomeComment;
export const TitleTag: React.FC<TitleTagProps> = (props) => {
  const { item } = props;
  const renderName = (name: string) => {
    if (!name) return 'admin';
    if (name.length > 10) return `${name.slice(0, 1)}...`;
    return name;
  };
  return (
    <div>
      {renderName(item.nickname)}
      <Tag color="orange" className="comment-tag">
        {item.group.length > 8 ? item.group.slice(-8) : item.group}
      </Tag>
    </div>
  );
};
