import React from 'react';
import { TagList } from '../../../pages/homework/adminMode/judge/homePreview';
import { PaperClipOutlined } from '@ant-design/icons';
import { List } from 'antd';

interface FileLinkProps {
  data: string[];
}
const FileLink: React.FC<FileLinkProps> = (props) => {
  const { data } = props;
  return (
    <>
      <TagList tag_name="附件">
        {data.map((item, index) => {
          return (
            <List.Item className="file" key={item}>
              <PaperClipOutlined className="file-icon" />
              <a className="file-text" href={item}>
                {item.split('%*&')[1] ? item.split('%*&')[1] : `'file-'${index}`}
              </a>
            </List.Item>
          );
        })}
      </TagList>
    </>
  );
};

export default FileLink;
