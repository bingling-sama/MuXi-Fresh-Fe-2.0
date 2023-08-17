import React, { useState, useEffect } from 'react';
import './Progress.less';
import { GetScheduleResult, Schedule } from './Progress';
import { get } from '../../fetch';
import { message } from 'antd';

const Progress: React.FC = () => {
  const [schedule, setSchedule] = useState<Schedule>({
    name: '',
    school: '',
    major: '',
    group: '',
    entry_form_status: '',
    admission_status: '',
  });

  useEffect(() => {
    void get(`/schedule/?schedule_id=${'myself'}`, true).then(
      (r: GetScheduleResult) => {
        setSchedule(r.data);
      },
      (e) => {
        console.error(e);
        void message.error('查询进度失败，请重试！');
      },
    );
  }, []);

  return (
    <div className="progress-wrap">
      <table className="progress-table" cellSpacing={0}>
        <tbody>
          <tr>
            <td className="tr-title">姓名</td>
            <td>{schedule.name}</td>
          </tr>
          <tr>
            <td className="tr-title">学院</td>
            <td>{schedule.school}</td>
          </tr>
          <tr>
            <td className="tr-title">专业</td>
            <td>{schedule.major}</td>
          </tr>
          <tr>
            <td className="tr-title">报名组别</td>
            <td>{schedule.group}</td>
          </tr>
          <tr>
            <td className="tr-title">报名表状态</td>
            <td>{schedule.entry_form_status}</td>
          </tr>
          <tr>
            <td className="tr-title">录取状态</td>
            <td>{schedule.admission_status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Progress;
