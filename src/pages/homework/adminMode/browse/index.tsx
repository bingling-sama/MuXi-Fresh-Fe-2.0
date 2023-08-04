import React, { useState } from 'react';
import './index.less';
import Form from '../../../../components/pages/table';
import Selector from '../../../../components/pages/selector';
import { defData } from '../../../../utils/deData';
import { dataType, taskListType } from '../../../../types';
import axiosInstance from '../../../../services/interceptor';
import { Collapse, CollapseProps } from 'antd';

const HomeworkBrowse: React.FC = () => {
  const [taskList, setTaskList] = useState<CollapseProps['items']>([]);
  const handleChange = (item: dataType): void => {
    axiosInstance.get(`/task/assigned/list?group=${item.value}`).then((res) => {
      const Res = res.data.data.titles as taskListType[];
      if (Res) {
        const tasks: CollapseProps['items'] = Res.map((item) => {
          return {
            key: item.id,
            label: item.text,
            children: <Form></Form>,
          };
        });
        setTaskList(tasks as CollapseProps['items']);
      }
    });
  };
  return (
    <div className="browse-wrap">
      <Selector
        title="选择组别"
        data={defData}
        onChange={(item) => handleChange(item as dataType)}
      ></Selector>
      <Collapse items={taskList}></Collapse>
    </div>
  );
};

export default HomeworkBrowse;
