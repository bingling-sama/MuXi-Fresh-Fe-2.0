import React from 'react';
import { TagList } from '../../pages/AdminMode/Judge/HomePreview';
import { PaperClipOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './index.less';

interface FileLinkProps {
  data: string[] | undefined;
  title?: string;
  className?: string;
  preview?: boolean;
}
export const FileLinkPure: React.FC<FileLinkProps> = (props) => {
  const { data, className, preview } = props;
  return (
    <>
      <div className={className}>
        {data &&
          data.map((item, index) => {
            return (
              <List.Item className="file" key={item}>
                {preview ? (
                  <img
                    className="file-preview"
                    src="https://s2.loli.net/2023/08/10/Wbg5lrvECMwHPSt.png"
                  ></img>
                ) : (
                  <PaperClipOutlined className="file-icon" />
                )}
                <a
                  className="file-text"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  href={item}
                  download={true}
                >
                  {item.split('--')[1] ? item.split('--')[1] : `file-${index}`}
                </a>
              </List.Item>
            );
          })}
        {!data && (
          <div className="empty-files">
            <InboxOutlined></InboxOutlined>
            <div className="empty-files-text">此作业暂无附件</div>
          </div>
        )}
      </div>
    </>
  );
};
const FileLink: React.FC<FileLinkProps> = (props) => {
  const { title, className } = props;
  return (
    <>
      <TagList tag_name={title ? title : '附件'} className={className}>
        <FileLinkPure {...props}></FileLinkPure>
      </TagList>
    </>
  );
};

export default FileLink;
