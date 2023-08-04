import React, { useState, useEffect } from 'react';
import { Avatar, Card } from 'antd';
import './index.less';
import Title from '../../../../../components/pages/title';
import FileLink from '../../../../../components/pages/files/index';
const { Meta } = Card;
interface TagListProps {
  tag_name: string;
  children: React.ReactNode;
  className?: string;
}
const HomePreview: React.FC = () => {
  const data = ['1', '2', '3', '4'];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 1000);
  });

  return (
    <>
      <Card
        className="homePreview-wrap"
        style={{ overflowY: 'auto' }}
        title={
          <Title title="前端组作业" style={{ marginLeft: '0' }}>
            评论区
          </Title>
        }
        loading={loading}
      >
        <div className="homePreview-card">
          <TagList tag_name="作业描述">
            <div className="description-card">1231123</div>
          </TagList>
          <TagList tag_name="提交人">
            <Card className="uploader-card">
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title="Card title"
                description="123123"
              />
            </Card>
          </TagList>
          <TagList tag_name="作业内容">
            <div className="description-card" style={{ height: '30vh' }}>
              1231123
            </div>
          </TagList>
          <FileLink data={data}></FileLink>
          {/* <TagList tag_name="附件">
                    {data.map((item) => {
                        return (
                            <div className="file" key={item}>
                                <PaperClipOutlined className="file-icon" />
                                <div className="file-text">{item}</div>
                            </div>
                        );
                    })}
                </TagList> */}
        </div>
      </Card>
    </>
  );
};

export default HomePreview;

export const TagList: React.FC<TagListProps> = (props) => {
  const { tag_name, children, className } = props;
  return (
    <>
      <div className={`tag-wrap ${className as string}`}>
        <div className="tag-name">{tag_name}</div>
        <div className="tag-content">{children}</div>
      </div>
    </>
  );
};
