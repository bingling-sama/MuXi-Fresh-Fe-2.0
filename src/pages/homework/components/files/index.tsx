import React from 'react';
import { TagList } from '../../pages/adminMode/judge/homePreview';
import { PaperClipOutlined } from '@ant-design/icons';
import { List } from 'antd';
import './index.less';

interface FileLinkProps {
  data: string[];
  title?: string;
  className?: string;
}
const FileLink: React.FC<FileLinkProps> = (props) => {
  const { data, title, className } = props;
  return (
    <>
      <TagList tag_name={title ? title : '附件'} className={className}>
        {data.map((item, index) => {
          return (
            <List.Item className="file" key={item}>
              <PaperClipOutlined className="file-icon" />
              <a className="file-text" target="_blank" href={item} download={true}>
                {item.split('--')[1] ? item.split('--')[1] : `file-${index}`}
              </a>
            </List.Item>
          );
        })}
      </TagList>
    </>
  );
};

export default FileLink;
