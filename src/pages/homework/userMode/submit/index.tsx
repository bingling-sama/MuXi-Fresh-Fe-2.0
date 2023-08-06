import React, { useState, useEffect } from 'react';
import UploadSection from '../../components/pages/uploadWrap';
import axiosInstance from '../../../../services/interceptor';
import { GroupType, taskListType } from '../../../../types';
import { message, UploadProps } from 'antd';
import InputBox from '../../components/pages/input';
import './index.less';

const HomeworkUserSubmit: React.FC = () => {
  const [taskList, setTaskList] = useState<taskListType[]>([{ id: '123', text: '123' }]);
  const [loading, setLoading] = useState(false);
  const [status, setstatus] = useState<number>(0);
  const [defList, setdefList] = useState<string[]>(['']);
  const [formData, setformData] = useState<string[]>(['']);
  const [selected, setselected] = useState<string>('');
  const statusList = ['未提交', '已提交', '已审阅'];
  const buttonList = ['提交作业', '修改作业', '无法修改'];
  const root = 'http://ossfresh-test.muxixyz.com/';
  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/task/assigned/list?group=${group}`).then((res) => {
      setTimeout(() => {
        setLoading(false);
      }, 200);
      if (res.data.data.titles) {
        setTaskList(res.data.data.titles as taskListType[]);
      } else {
        setTaskList([{ id: '', text: '暂时没有作业' }]);
      }
    });
  }, []);
  const group: GroupType = 'Frontend';
  const handleSubmit = (query: any) => {
    console.log(query);
    if (status != 2)
      axiosInstance
        .post(`/task/submitted`, {
          urls: formData,
          assignedTaskID: selected,
        })
        .then(() => {
          message.success('提交成功');
          handleSwitch(selected);
        })
        .catch(() => {
          message.error(`提交失败`);
        });
  };
  const handleChangeUpload = (e: UploadProps['fileList']) => {
    // console.log(e);
    if (e && e[0]) {
      const tmpList = e?.map((item) => {
        if (item?.response) return ` ${root}${item.response.key as string}`;
        else return `${item.url as string}`;
      });
      setformData(tmpList ? tmpList : ['']);
    }
  };
  const handleSwitch = (id: string) => {
    setselected(id);
    axiosInstance.get(`/task/assigned/${id}/status`).then((res) => {
      setdefList(['']);
      if (res.data.data.task_status !== '未提交') {
        axiosInstance.get(`/task/submitted/myself/${id}`).then((res) => {
          setdefList(res.data.data.urls as string[]);
        });
      }
      const stat: string = res.data.data.task_status;
      setstatus(statusList.indexOf(stat));
    });
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <UploadSection
          onSwitch={handleSwitch}
          taskList={taskList}
          loading={loading}
          choice="user-edit"
          title={group + '作业'}
          status={status}
          button_title={buttonList[status]}
          onSubmit={handleSubmit}
          submitDisabled={status == 2}
        >
          <InputBox
            className="inp"
            type="file"
            label="上传作业"
            defaultValue={defList}
            disabled={status == 2}
            onChange={(files) => handleChangeUpload(files as UploadProps['fileList'])}
          ></InputBox>
        </UploadSection>
      </div>
    </>
  );
};

export default HomeworkUserSubmit;
