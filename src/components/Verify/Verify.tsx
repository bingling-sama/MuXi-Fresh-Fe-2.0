import { Navigate } from 'react-router-dom';
import React, { ReactNode, useState } from 'react';
import { message } from 'antd';
import { get } from '../../fetch.ts';

type VerifyProps = {
  element: ReactNode;
};

const Verify: React.FC<VerifyProps> = ({ element }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <VerifyToken element={element} />;
  } else {
    void message.error('未登录，请先登录');
    return <Navigate to="/login" replace state={{ message: '未登录，请先登录' }} />;
  }
};

export default Verify;

const VerifyToken: React.FC<VerifyProps> = ({ element }) => {
  const [errCode, setErrCode] = useState(0);
  get('/users/my-info').catch((err: Error) => {
    setErrCode(Number(err.message));
  });

  if (errCode === 401) {
    void message.error('登录已过期，请重新登录');
    return <Navigate to="/login" replace state={{ message: '登录已过期，请重新登录' }} />;
  } else {
    return element;
  }
};
