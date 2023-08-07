import React, { useState, useEffect, CSSProperties } from 'react';
import './index.less';
import Selector from '../selector';
import UploadSection from '../uploadWrap';
import { get, post } from '../../../../../services/fetch';
import { taskListType, dataType, choiceType, TaskInfoType } from '../../../types';
import { message } from 'antd';
import { defData } from '../../../utils/deData';
interface HomeworkSubmitProps {
  title?: string;
  choice?: choiceType;
  button_title?: string;
  className?: string;
  style?: CSSProperties;
}

const HomeworkSubmit: React.FC<HomeworkSubmitProps> = (props) => {
  const [selected, setselected] = useState<dataType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [taskList, setTaskList] = useState<taskListType[]>([]);
  const { title, button_title, choice, ...restProps } = props;
  useEffect(() => {
    handleChange(defData[0]);
  }, []);
  const handleSubmit = (query: TaskInfoType) => {
    post(`/task/assigned?group=${selected ? selected?.value : ''}`, query)
      .then(() => {
        message.success('提交成功');
      })
      .catch(() => {
        message.error(`提交失败`);
      });
  };
  const handleChange = (item: dataType) => {
    setselected(item);
    setLoading(true);
    get(`/task/assigned/list?group=${item.value}`).then((res) => {
      setTimeout(() => {
        setLoading(false);
      }, 200);
      if (res.data.titles) {
        setTaskList(res.data.titles.reverse() as taskListType[]);
      } else {
        setTaskList([{ id: '', text: '暂时没有作业' }]);
      }
    });
  };
  return (
    <div id="homework-edit-wrap" {...restProps}>
      <Selector
        title="组别选择"
        data={defData}
        className="selector-edit"
        onChange={(item) => handleChange(item as dataType)}
      ></Selector>
      <UploadSection
        onSubmit={handleSubmit}
        choice={choice ? choice : 'edit'}
        title={title ? title : '修改作业'}
        button_title={button_title ? button_title : '确认修改'}
        taskList={taskList}
        loading={loading}
      ></UploadSection>
    </div>
  );
};

export default HomeworkSubmit;
