import React, { useEffect, useState } from 'react';
import UploadSection from '../../../components/uploadWrap';
import { debounce } from '../../../../../components/Debounce/debounce.ts';
import { get, post } from '../../../../../fetch.ts';
import {
  backType,
  cmtType,
  CommentType,
  dataType,
  statusType,
  taskListType,
  titleListType,
  userTaskType,
  formInfoType,
} from '../../../types';
import { message, UploadProps } from 'antd';
import { defData } from '../../../utils/deData';
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
  const [group, setGroup] = useState<dataType>({ key: '后端组', value: 'Backend' });
  const [Comment, setComment] = useState<CommentType[]>([]);
  const statusList = ['未提交', '已提交', '已审阅'];
  const buttonList = ['提交作业', '修改作业', '无法修改'];
  const root = 'https://ossfresh-test.muxixyz.com/';

  useEffect(() => {
    setLoading(true);
    get('/form/view?entry_form_id=myself').then((res: backType<formInfoType>) => {
      const groupRes = res.data.group;
      defData.forEach((item) => {
        if (groupRes.includes(item.value)) {
          setGroup(item);
          get(`/task/assigned/list?group=${item.value}`).then(
            (res: backType<titleListType>) => {
              setLoading(false);
              if (res.data.titles) {
                setTaskList(res.data.titles.reverse());
              } else {
                setTaskList([{ id: '', text: '暂时没有作业' }]);
              }
            },
            null,
          );
        }
      });
    }, null);
  }, []);
  const handleSubmit = () => {
    if (status != 2)
      post(`/task/submitted`, {
        urls: formData,
        assignedTaskID: selected,
      })
        .then(() => {
          if (formData[0]) message.success('提交成功').then(null, null);
          else message.error('作业内容不能为空').then(null, null);
          handleSwitch(selected);
        })
        .catch(() => {
          message.error(`提交失败`).then(null, null);
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
      get(`/task/submitted?user_id=myself&assigned_task_id=${id}`).then(
        (resp: backType<userTaskType>) => {
          if (res.data.task_status === '已审阅') {
            getComment(resp.data?.submission_id as string);
          }
          setdefList(resp.data.urls);
        },
        null,
      );

      const stat: string = res.data.task_status;
      setstatus(statusList.indexOf(stat));
    }, null);
  };
  const getComment = (SubmitID: string) => {
    get(`/task/submitted/${SubmitID}/comment`).then((res: backType<cmtType>) => {
      const comments = res.data?.comments;
      comments && setComment(comments);
    }, null);
  };
  return (
    <>
      <div className={'user-submit'} style={{ display: 'flex' }}>
        <UploadSection
          onSwitch={handleSwitch}
          taskList={taskList}
          loading={loading}
          choice="user-edit"
          title={`${group.key}作业`}
          status={status}
          button_title={buttonList[status]}
          onSubmit={debounce(handleSubmit, 400)}
          submitDisabled={status == 2}
          className={status != 2 ? 'user-submit-preview' : 'user-submit-preview-small'}
        >
          <InputBox
            className="inp"
            type="file"
            label="上传作业"
            defaultValue={defList}
            disabled={status == 2 || (taskList && !taskList[0].id)}
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
