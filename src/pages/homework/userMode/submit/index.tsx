import React, { useState, useEffect } from 'react';
import UploadSection from '../../../../components/pages/uploadWrap';
import axiosInstance from '../../../../services/interceptor';
import { GroupType, taskListType } from '../../../../types';
import { message, UploadProps } from 'antd';
import InputBox from '../../../../components/pages/input';
import './index.less';

const HomeworkUserSubmit: React.FC = () => {
  const [taskList, setTaskList] = useState<taskListType[]>([{ id: '123', text: '123' }]);
  const [loading, setLoading] = useState(false);
  const [status, setstatus] = useState<boolean>(false);
  const [defList, setdefList] = useState<string[]>(['']);
  const [formData, setformData] = useState<string[]>(['']);
  const root = 'http://ossfresh-test.muxixyz.com/';
  console.log(formData);
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
    axiosInstance
      .post(`/task/assigned?group=${group}`, {
        urls: query.urls,
      })
      .then(() => {
        message.success('提交成功');
      })
      .catch(() => {
        message.error(`提交失败`);
      });
  };
  const handleChangeUpload = (e: UploadProps['fileList']) => {
    const tmpList = e?.map((item) => {
      if (item?.response) return ` ${root}  ${item.response.key as string}`;
      else return item.name;
    });
    setformData(tmpList ? tmpList : ['']);
  };
  const handleSwitch = (id: string) => {
    axiosInstance.get(`/task/assigned/${id}/status`).then((res) => {
      if (res.data.data.task_status === '已提交') {
        axiosInstance.get(`/task/submitted/empty/${id}`).then((res) => {
          console.log(res);
          setdefList(res.data.data.urls as string[]);
        });
      }
      setstatus(res.data.data.task_status === '已提交');
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
          button_title="提交作业"
          onSubmit={handleSubmit}
        >
          <InputBox
            className="inp"
            type="file"
            label="123123"
            defaultValue={defList}
            onChange={(files) => handleChangeUpload(files as UploadProps['fileList'])}
          ></InputBox>
        </UploadSection>
      </div>
    </>
  );
};

export default HomeworkUserSubmit;
