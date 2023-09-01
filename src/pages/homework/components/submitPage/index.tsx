import React, { CSSProperties, useEffect, useState } from 'react';
import './index.less';
import Selector from '../selector';
import UploadSection from '../uploadWrap';
import { get, post } from '../../../../fetch.ts';
import {
  backType,
  choiceType,
  dataType,
  TaskInfoType,
  taskListType,
  titleListType,
} from '../../types';
import { message } from 'antd';
import { defData } from '../../utils/deData';

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
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    handleChange(defData[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (item: dataType) => {
    setselected(item);
    setLoading(true);
    UpdateTaskList(item);
  };
  const handleSubmit = (query: TaskInfoType) => {
    post(`/task/assigned?group=${selected ? selected?.value : ''}`, query)
      .then(() => {
        UpdateTaskList(selected as dataType);
        message.success('提交成功').then(null, null);
      })
      .catch(() => {
        message.error(`提交失败`).then(null, null);
      });
  };

  const UpdateTaskList = (item: dataType) => {
    get(`/task/assigned/list?group=${item.value}`).then(
      (res: backType<titleListType>) => {
        setLoading(false);
        if (res.data.titles) {
          setTaskList(res.data.titles.reverse());
        } else {
          setTaskList([{ id: '', text: '暂时没有作业' }]);
          message.error('暂时没有作业').then(null, null);
        }
      },
      null,
    );
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
