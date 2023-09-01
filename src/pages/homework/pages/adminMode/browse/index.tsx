import React, { useState } from 'react';
import './index.less';
import Form, { Empty } from '../../../components/table';
import Selector from '../../../components/selector';
import { defData } from '../../../utils/deData';
import { backType, dataType, titleListType } from '../../../types';
import { get } from '../../../../../fetch.ts';
import { Collapse, CollapseProps, message } from 'antd';

const HomeworkBrowse: React.FC = () => {
  const [taskList, setTaskList] = useState<CollapseProps['items']>([]);
  const handleChange = (item: dataType): void => {
    get(`/task/assigned/list?group=${item.value}`).then(
      (res: backType<titleListType>) => {
        const Res = res.data.titles;
        if (Res) {
          const tasks: CollapseProps['items'] = Res.map((itm) => {
            return {
              key: itm.id,
              label: itm.text,
              children: <Form task_id={itm.id} group={item.value}></Form>,
            };
          });
          setTaskList(tasks.reverse() as CollapseProps['items']);
        } else {
          message.info('暂无作业😵').then(null, null);
          setTaskList([
            {
              key: '',
              label: '暂无作业😵',
              children: (
                <div style={{ height: '40vh' }}>
                  <Empty />
                </div>
              ),
            },
          ]);
        }
      },
      null,
    );
  };
  return (
    <div className={'browse-wrapper'}>
      <div className="browse-wrap">
        <Selector
          title="选择组别"
          data={defData}
          onChange={(item) => handleChange(item as dataType)}
          className="browse-selector"
        ></Selector>
        <Collapse
          bordered={false}
          items={taskList}
          className="browse-collapse"
        ></Collapse>
      </div>
    </div>
  );
};

export default HomeworkBrowse;
