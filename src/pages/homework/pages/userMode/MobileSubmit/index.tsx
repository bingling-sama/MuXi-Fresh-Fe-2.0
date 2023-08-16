/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import React, { useEffect, useState } from 'react';
import './index.less';
import PageWrapMobile from '../../../components/pageWrap-mobile';
import TopBarMobile from '../../../components/selector-mobile';
import InputBox from '../../../components/input';
import { DropDownPure } from '../../../components/dropDown';
import Uploader from '../../../components/upload';
import { taskListType, dataType, TaskInfoType } from '../../../types';
import { get, post } from '../../../../../services/fetch';
import { ConfigProvider, UploadProps, message } from 'antd';
import { root } from '../../../utils/deData';
import FileLink from '../../../components/files';

const HomeworkUserSubmitMobile: React.FC = () => {
  const [selected, setSelected] = useState<dataType>();
  const [formData, setFormData] = useState<string[]>();
  const [taskList, setTaskList] = useState<taskListType[]>([
    { id: '', text: '暂时没有作业' },
  ]);
  const [currentTaskInfo, setCurrentTaskInfo] = useState<TaskInfoType>();
  const [currentTaskID, setCurrentTaskID] = useState<string>();
  useEffect(() => {
    selected &&
      get(`/task/assigned/list?group=${selected.value}`).then((res) => {
        if (res.data.titles) {
          setTaskList(res.data.titles.reverse() as taskListType[]);
        }
      });
  }, [selected]);
  const handleSubmit = () => {
    post(`/task/submitted`, {
      assignedTaskID: currentTaskID,
      urls: formData,
    })
      .then(() => {
        message.success('提交成功').then();
      })
      .catch(() => {
        message.error(`提交失败`).then();
      });
  };
  const handleSwitch = (e: TaskInfoType, id: string) => {
    console.log(e);
    setCurrentTaskID(id);
    setCurrentTaskInfo(e);
  };
  const handleChangeUpload = (e: UploadProps['fileList']) => {
    const tmpList = e?.map((item) => {
      if (item?.response) return `${root}${item.response.key as string}`;
      else return `${item.url as string}`;
    });
    setFormData(tmpList);
  };
  const handleChange = (e: dataType) => {
    setSelected(e);
  };
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FFC93F',
          },
        }}
      >
        <PageWrapMobile title="提交作业">
          <TopBarMobile onChange={handleChange}></TopBarMobile>
          <div className="user-mobile-submit">
            <div className="user-mobile-drop">
              {'标题'}
              <DropDownPure
                pure
                type="user"
                data={taskList}
                onSwitch={handleSwitch}
              ></DropDownPure>
            </div>
            <InputBox
              type="textarea"
              label="内容简介"
              disabled
              className="input-mobile"
              limit={500}
              defaultValue={[currentTaskInfo?.content as string]}
              onChange={() => {
                console.log(123);
              }}
            ></InputBox>
            <FileLink className="file-mobile" data={currentTaskInfo?.urls}></FileLink>
            <div className="user-mobile-drop">
              {'标题'}
              <Uploader mobile onChange={handleChangeUpload}></Uploader>
            </div>
          </div>
          <div className="user-submit-button" onClick={handleSubmit}>
            提交作业
          </div>
        </PageWrapMobile>
      </ConfigProvider>
    </>
  );
};

export default HomeworkUserSubmitMobile;
