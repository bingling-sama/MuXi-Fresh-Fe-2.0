import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableType } from '../../../types';
import { NavLink } from 'react-router-dom';

export const columns: ColumnsType<TableType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
  },
  {
    title: '学院',
    dataIndex: 'college',
    key: 'college',
  },
  {
    title: '作业状态',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      let color = 'green';
      if (status != '已审阅') {
        color = 'gray';
      }
      return (
        <>
          <Tag color={color}>{status}</Tag>
        </>
      );
    },
  },
  {
    title: '操作',
    key: 'action',
    render: (_, { task_id, group }) => (
      <Space size="middle">
        <NavLink to={`/homework/admin/judge/${group}/${task_id}`}>点击查看</NavLink>
      </Space>
    ),
  },
];
