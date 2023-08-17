import React, { useState } from 'react';
import {
  backType,
  statusType,
  TaskInfoType,
  taskListType,
  userTaskType,
} from '../../../types';
import { get, post } from '../../../../../fetch.ts';
import { message, UploadProps } from 'antd';
import { root } from '../../../utils/deData.ts';
import { DropDownPure } from '../../../components/dropDown';
import InputBox from '../../../components/input';
import FileLink from '../../../components/files';
import Uploader from '../../../components/upload';
interface SubmitBeforeJudgeMobileProps {
  taskList: taskListType[];
  onTaskChange?: (judged: boolean, submissionID?: string) => void;
}
const SubmitCompMobile: React.FC<SubmitBeforeJudgeMobileProps> = (props) => {
  const [formData, setFormData] = useState<string[]>();
  const [currentTaskInfo, setCurrentTaskInfo] = useState<TaskInfoType>();
  const [currentTaskID, setCurrentTaskID] = useState<string>();
  const [uploadHistory, setUploadHistory] = useState<string[]>();
  const { taskList, onTaskChange } = props;
  const handleSubmit = () => {
    post(`/task/submitted`, {
      assignedTaskID: currentTaskID,
      urls: formData,
    })
      .then(() => {
        message.success('提交成功').then(null, null);
      })
      .catch(() => {
        message.error(`提交失败`).then(null, null);
      });
  };
  const handleSwitch = (e: TaskInfoType, id: string) => {
    get(`/task/assigned/${id}/status`).then((res: backType<statusType>) => {
      if (res.data.task_status != '未提交') {
        get(`/task/submitted/myself/${id}`).then((resp: backType<userTaskType>) => {
          console.log(res.data);
          setUploadHistory(resp.data.urls);
          onTaskChange &&
            onTaskChange(
              res.data?.task_status === '已审阅',
              resp.data?.submission_id as string,
            );
        }, null);
      } else {
        setUploadHistory(undefined);
      }
    }, null);
    setCurrentTaskID(id);
    setCurrentTaskInfo(e);
  };
  const handleChangeUpload = (e: UploadProps['fileList']) => {
    const tmpList = e?.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (item?.response) return `${root}${item.response.key as string}`;
      else return `${item.url as string}`;
    });
    setFormData(tmpList);
  };
  return (
    <>
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
            console.log();
          }}
        ></InputBox>
        <FileLink className="file-mobile" data={currentTaskInfo?.urls}></FileLink>
        <div className="user-mobile-drop">
          {'标题'}
          <Uploader
            mobile
            onChange={handleChangeUpload}
            defaultList={uploadHistory}
          ></Uploader>
        </div>
      </div>
      <div className="user-submit-button" onClick={handleSubmit}>
        提交作业
      </div>
    </>
  );
};
export default SubmitCompMobile;
