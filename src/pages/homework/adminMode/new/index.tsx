import React from 'react';
import HomeworkSubmit from '../../components/pages/submitPage';

const HomeworkNew: React.FC = () => {
  return (
    <HomeworkSubmit title="新作业" button_title="确认提交" choice="new"></HomeworkSubmit>
  );
};

export default HomeworkNew;
