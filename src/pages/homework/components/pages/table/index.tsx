import React, { useState, useEffect, CSSProperties } from 'react';
import { Card, Avatar, Tag } from 'antd';
import { ConfigProvider } from 'antd';
import './index.less';
import { TableType } from '../../../types';
import { get } from '../../../../../services/fetch';
import Title from '../title';
import { NavLink } from 'react-router-dom';
const { Meta } = Card;

interface FormProps {
  columnConfig?: any;
  classNames?: string;
  style?: CSSProperties;
  task_id?: string;
  group?: string;
}
interface DataTableProps {
  dataSet: TableType[];
  className?: string;
}
const Form: React.FC<FormProps> = (props) => {
  const [dataSet, setdataSet] = useState<TableType[]>([]);
  const { task_id, group, style, classNames } = props;
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    handleListRequest();
  }, []);
  const handleListRequest = () => {
    get(`/task/assigned/${task_id as string}/completion?page=1`).then((res) => {
      const { completions } = res.data;
      if (completions) {
        const com: TableType[] = completions.map((item: any) => {
          return {
            ...item,
            group: group,
            key: item.user_id,
            task_id: task_id,
          };
        });
        setdataSet(com.reverse());
      }
    });
  };
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#F79B2E',
          },
        }}
      >
        <div style={style} className={'form-wrap' + ' ' + (classNames as string)}>
          <DataTable className="data-table-item" dataSet={dataSet}></DataTable>
        </div>
      </ConfigProvider>
    </>
  );
};

export default Form;

export const DataTable: React.FC<DataTableProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  const { className, dataSet } = props;
  return (
    <>
      {dataSet &&
        dataSet.map((item) => (
          <Card
            className={className}
            loading={loading}
            key={`${item.task_id}${item.email}`}
          >
            <Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.name}
              description={item.email}
            />
            <Tag
              color={item.status === '已审阅' ? 'green' : 'orange'}
              className="data-table-tag"
            >
              {item.status}
            </Tag>
            <NavLink
              className="data-table-card"
              to={`/homework/admin/judge`}
              state={item}
            >
              点击查看
            </NavLink>
          </Card>
        ))}
      {!dataSet[0] && (
        <div className="empty-image-wrap">
          <img
            src="https://s2.loli.net/2023/08/06/haG14HpKk5gczIR.png"
            className="empty-image"
          ></img>
          <Title title="暂无数据" className="empty-text"></Title>
        </div>
      )}
    </>
  );
};
