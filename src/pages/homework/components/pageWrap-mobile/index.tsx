import React from 'react';
import './index.less';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

interface PageWrapProps {
  children?: React.ReactNode;
  title?: string;
  backPath?: string;
}
const PageWrapMobile: React.FC<PageWrapProps> = (props) => {
  const { children, backPath, title } = props;
  const navi = useNavigate();
  const handleNavi = () => {
    navi(backPath as string);
  };
  return (
    <>
      <div className="page-wrap-mobile">
        <div className="page-top">
          <div className="page-back" onClick={handleNavi}>
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
