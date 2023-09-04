import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { get } from '../../../../fetch.ts';
import { backType, formStatusType } from '../../types';
import { message } from 'antd';

const HomeworkAdminMode: React.FC = () => {
  const nav = useNavigate();
  useEffect(() => {
    get('/form/judge').then((res: backType<formStatusType>) => {
      console.log(res.data.user_type === 'admin');
      if (res.data.user_type !== 'admin') {
        message.error('无权限访问').then(null, null);
        nav('/app/homework/user/submit');
      }
    }, null);
  }, [nav]);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Outlet></Outlet>
    </div>
  );
};

export default HomeworkAdminMode;
