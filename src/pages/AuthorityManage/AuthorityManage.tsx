import './AuthorityManage.less';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { get } from '../../fetch.ts';
import { AdminList, AdminRow } from './AdminList.ts';
import AdminLists from './components/AdminLists/AdminLists.tsx';

const AuthorityManage = () => {
  const [superAdmin, setSuperAdmin] = useState<AdminRow[]>([]);
  const [admin, setAdmin] = useState<AdminRow[]>([]);
  const [ordinary, setOrdinary] = useState<AdminRow[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const getUserList = (
    user_type: string,
    setState: React.Dispatch<React.SetStateAction<AdminRow[]>>,
    user_type_cn: string,
  ) => {
    setLoading(true);
    get(`/users/admin-list?user_type=${user_type}`).then(
      (r: AdminList) => {
        const { list } = r.data;
        if (list !== null) setState(list);
        setLoading(false);
      },
      (e) => {
        void message.error(`获取${user_type_cn}列表失败，请稍后重试`);
        console.error(e);
      },
    );
  };

  useEffect(() => {
    getUserList('super_admin', setSuperAdmin, '超级管理员');
    getUserList('admin', setAdmin, '管理员');
    getUserList('normal', setOrdinary, '普通用户');
  }, []);

  return (
    <div className="authorityManageBox">
      <div className={'authorityManage'}>
        <AdminLists
          header={<b>超级管理员</b>}
          dataSource={superAdmin}
          loading={loading}
        ></AdminLists>
        <AdminLists
          header={<b>管理员</b>}
          dataSource={admin}
          loading={loading}
        ></AdminLists>
        <AdminLists
          header={<b>普通成员</b>}
          dataSource={ordinary}
          loading={loading}
        ></AdminLists>
      </div>
    </div>
  );
};

export default AuthorityManage;
