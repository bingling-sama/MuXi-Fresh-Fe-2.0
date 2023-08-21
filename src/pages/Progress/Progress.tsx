import React, { useState, useEffect } from 'react';
import './Progress.less';
import { GetScheduleResult, Schedule } from './Progress';
import { get } from '../../fetch';
import { Spin, message } from 'antd';
import { Group } from '../Review/ReviewFitler';

const Progress: React.FC = () => {
  const [schedule, setSchedule] = useState<Schedule>({
    name: '',
    school: '',
    major: '',
    group: Group.Product,
    entry_form_status: '',
    admission_status: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  const chineseGroups: { [key in Group]: string } = {
    Android: '安卓组',
    Backend: '后端组',
    Design: '设计组',
    Frontend: '前端组',
    Product: '产品组',
  };

  useEffect(() => {
    void get(`/schedule/?schedule_id=${'myself'}`, true).then(
      (r: GetScheduleResult) => {
        setSchedule(r.data);
        setIsLoading(false);
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
        <thead>
          <tr>
            <th className="table-title" colSpan={2}>
              木犀招新进度查询
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tr-title">姓名</td>
            {isLoading ? <Spin /> : <td className="tr-content">{schedule.name}</td>}
          </tr>
          <tr>
            <td className="tr-title">学院</td>
            {isLoading ? <Spin /> : <td className="tr-content">{schedule.school}</td>}
          </tr>
          <tr>
            <td className="tr-title">专业</td>
            {isLoading ? <Spin /> : <td className="tr-content">{schedule.major}</td>}
          </tr>
          <tr>
            <td className="tr-title">报名组别</td>
            {isLoading ? (
              <Spin />
            ) : (
              <td className="tr-content">{chineseGroups[schedule.group]}</td>
            )}
          </tr>
          <tr>
            <td className="tr-title">报名表状态</td>
            {isLoading ? (
              <Spin />
            ) : (
              <td className="tr-content">{schedule.entry_form_status}</td>
            )}
          </tr>
          <tr>
            <td className="tr-title">录取状态</td>
            {isLoading ? (
              <Spin />
            ) : (
              <td className="tr-content">{schedule.admission_status}</td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Progress;
