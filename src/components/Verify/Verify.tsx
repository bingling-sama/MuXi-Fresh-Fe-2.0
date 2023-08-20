import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { message } from 'antd';
import { get } from '../../fetch.ts';
import { UserIdentity, UserIsForm, UserJudge } from './UserIdentity.ts';
import Layout from '../Layout/Layout.tsx';
import { isDesktop } from 'react-device-detect';
import MobileHomepage from '../../pages/MobileHomepage/MobileHomepage.tsx';

const Verify: React.FC = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return <VerifyToken />;
  } else {
    void message.error('未登录，请先登录');
    return <Navigate to="/login" replace state={{ message: '未登录，请先登录' }} />;
  }
};

export default Verify;

const VerifyToken: React.FC = () => {
  const [identity, setIdentity] = useState<UserIdentity>('freshman');
  const [isForm, setIsForm] = useState<UserIsForm>('未交表');
  const [errCode, setErrCode] = useState(0);
  get('/form/judge')
    .then((r: UserJudge) => {
      const { user_type, form_status } = r.data;
      setIdentity(user_type);
      setIsForm(form_status);
    })
    .catch((err: Error) => {
      setErrCode(Number(err.message));
    });

  if (errCode === 401) {
    void message.error('登录已过期，请重新登录');
    return <Navigate to="/login" replace state={{ message: '登录已过期，请重新登录' }} />;
  } else {
    if (isDesktop) return <Layout identity={identity} isForm={isForm} />;
    else return <MobileHomepage />;
  }
};
