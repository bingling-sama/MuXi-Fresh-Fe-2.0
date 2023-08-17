import React, { useEffect, useState } from 'react';
import './index.less';
import PageWrapMobile from '../../../components/pageWrap-mobile';
import TopBarMobile from '../../../components/selector-mobile';
import { backType, dataType, taskListType, titleListType } from '../../../types';
import { get } from '../../../../../fetch.ts';
import { ConfigProvider } from 'antd';
import SubmitBeforeJudge from './submitBeforeJudge.tsx';
import SubmitJudged from './submitJudged.tsx';
import { nullFunc } from '../../../utils/deData.ts';

const HomeworkUserSubmitMobile: React.FC = () => {
  const [selected, setSelected] = useState<dataType>();
  const [judged, setJudged] = useState<boolean>(false);
  const [SubmissionID, setSubmissionID] = useState<string>('');
  const [taskList, setTaskList] = useState<taskListType[]>([
    { id: '', text: '暂时没有作业' },
  ]);
  useEffect(() => {
    selected &&
      get(`/task/assigned/list?group=${selected.value}`).then(
        (res: backType<titleListType>) => {
          if (res.data.titles) {
            setTaskList(res.data.titles.reverse());
          }
        },
        nullFunc,
      );
  }, [selected]);

  const handleTaskChange = (judged: boolean, submissionID: string | undefined) => {
    console.log(judged);
    setJudged(judged);
    if (submissionID) setSubmissionID(submissionID);
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
          {judged ? (
            <SubmitJudged submissionID={SubmissionID} />
          ) : (
            <SubmitBeforeJudge taskList={taskList} onTaskChange={handleTaskChange} />
          )}
        </PageWrapMobile>
      </ConfigProvider>
    </>
  );
};

export default HomeworkUserSubmitMobile;
