import React from 'react';
import { Button, ButtonProps, ConfigProvider } from 'antd';
import './index.less';

interface SubmitProps {
  className?: string;
}
type BProps = SubmitProps & Omit<ButtonProps, 'className'>;
const Submit: React.FC<BProps> = (props) => {
  const { className, ...restProps } = props;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F79B2E',
        },
      }}
    >
      <div className={`hover button-fix ${className as string}`}>
        <Button {...restProps} className={'submit '}></Button>
      </div>
    </ConfigProvider>
  );
};
export default Submit;
