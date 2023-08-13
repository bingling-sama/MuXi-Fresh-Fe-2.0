import { Avatar, List } from 'antd';
import React, { ReactNode } from 'react';
import { AdminRow } from '../../AdminList.ts';
import './AdminLists.less';

type ReviewTableProps = {
  header: ReactNode;
  dataSource: AdminRow[];
  loading: boolean;
};
const AdminLists: React.FC<ReviewTableProps> = ({ header, dataSource, loading }) => {
  return (
    <List
      header={header}
      bordered
      loading={loading}
      className={'authorityManageList'}
      pagination={{
        position: 'bottom',
        align: 'center',
        pageSize: 6,
        showSizeChanger: false,
      }}
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={item.nickname}
            description={
              <div>
                {item.name}
                <br />
                {item.user_id}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default AdminLists;
