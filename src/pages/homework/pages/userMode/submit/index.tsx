import React, { useEffect, useState } from 'react';
import UploadSection from '../../../components/uploadWrap';
import { get, post } from '../../../../../fetch.ts';
import {
  backType,
  commentType,
  CommentType,
  dataType,
  statusType,
  taskListType,
  titleListType,
  userInfoType,
  userTaskType,
} from '../../../types';
import { message, UploadProps } from 'antd';
import { defData, nullFunc } from '../../../utils/deData';
import InputBox from '../../../components/input';
import './index.less';
import HomeComment from '../../adminMode/judge/comment';

const HomeworkUserSubmit: React.FC = () => {
  const [taskList, setTaskList] = useState<taskListType[]>([{ id: '123', text: '123' }]);
  const [loading, setLoading] = useState(false);
  const [status, setstatus] = useState<number>(0);
  const [defList, setdefList] = useState<string[]>(['']);
  const [formData, setformData] = useState<string[]>(['']);
  const [selected, setselected] = useState<string>('');
  const [group, setGroup] = useState<dataType>({ key: '前端组', value: 'Frontend' });
  const [Comment, setComment] = useState<CommentType[]>([]);
  const statusList = ['未提交', '已提交', '已审阅'];
  const buttonList = ['提交作业', '修改作业', '无法修改'];
  const root = 'http://ossfresh-test.muxixyz.com/';
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setLoading(true);
    get('/users/my-info').then((res: backType<userInfoType>) => {
      const groupRes = res.data.group;
      defData.forEach((item) => {
        if (item.key == groupRes) {
          setGroup(item);
        }
      });
      get(`/task/assigned/list?group=${group.value}`).then(
        (res: backType<titleListType>) => {
          setTimeout(() => {
            setLoading(false);
          }, 200);
          if (res.data.titles) {
            setTaskList(res.data.titles.reverse());
          } else {
            setTaskList([{ id: '', text: '暂时没有作业' }]);
          }
        },
        nullFunc,
      );
    }, nullFunc);
  }, []);
  const handleSubmit = () => {
    if (status != 2)
      post(`/task/submitted`, {
        urls: formData,
        assignedTaskID: selected,
      })
        .then(() => {
          message.success('提交成功').then(nullFunc, nullFunc);
          handleSwitch(selected);
        })
        .catch(() => {
          message.error(`提交失败`).then(nullFunc, nullFunc);
        });
  };
  const handleChangeUpload = (e: UploadProps['fileList']) => {
    if (e && e[0]) {
      const tmpList = e?.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (item?.response) return ` ${root}${item?.response?.key as string}`;
        else return `${item.url as string}`;
      });
      setformData(tmpList ? tmpList : ['']);
    }
  };
  const handleSwitch = (id: string) => {
    setselected(id);
    get(`/task/assigned/${id}/status`).then((res: backType<statusType>) => {
      setdefList(['']);
      get(`/task/submitted/myself/${id}`).then((resp: backType<userTaskType>) => {
        if (res.data.task_status === '已审阅') {
          getComment(resp.data?.submission_id as string);
        }
        setdefList(resp.data.urls);
      }, nullFunc);

      const stat: string = res.data.task_status;
      setstatus(statusList.indexOf(stat));
    }, nullFunc);
  };
  const getComment = (SubmitID: string) => {
    get(`/task/submitted/${SubmitID}/comment`).then((res: backType<commentType>) => {
      const comments = res.data?.comments;
      comments && setComment(comments as CommentType[]);
    }, nullFunc);
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <UploadSection
          onSwitch={handleSwitch}
          taskList={taskList}
          loading={loading}
          choice="user-edit"
          title={`${group.key}作业`}
          status={status}
          button_title={buttonList[status]}
          onSubmit={handleSubmit}
          submitDisabled={status == 2}
          className={status != 2 ? 'user-submit-preview' : 'user-submit-preview-small'}
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
        {status == 2 && (
          <HomeComment
            CommentData={Comment}
            className="user-submit-comment"
          ></HomeComment>
        )}
      </div>
    </>
  );
};

export default HomeworkUserSubmit;
