import React from 'react';
import './index.less';
import { LeftOutlined } from '@ant-design/icons';
interface PageWrapProps {
  children?: React.ReactNode;
  title?: string;
}
const PageWrapMobile: React.FC<PageWrapProps> = (props) => {
  const { children, title } = props;
  return (
    <>
      <div className="page-wrap-mobile">
        <div className="page-top">
          <div className="page-back">
            <LeftOutlined />
          </div>
          <div className="page-title">{title}</div>
        </div>
        <div className="page-container">
          <div className="page-container-inner">{children}</div>
        </div>
      </div>
    </>
  );
};

export default PageWrapMobile;
