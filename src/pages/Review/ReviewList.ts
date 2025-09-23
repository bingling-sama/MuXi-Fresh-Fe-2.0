import { Group } from './ReviewFitler.ts';

export enum AdmissionStatus {
  '已报名' = '已报名',
  '实习期' = '实习期',
  '已转正' = '已转正',
}

export enum ExamStatus {
  '已提交' = '已提交',
  '未提交' = '未提交',
}

export enum Gender {
  'male' = '男',
  'female' = '女',
}

export interface ReviewRow {
  admission_status: AdmissionStatus;
  exam_status: ExamStatus;
  form_id: string;
  grader: string;
  group: Group;
  name: string;
  schedule_id: string;
  school: string;
  user_id: string;
  gender: Gender;
}

export interface ReviewList {
  code: 0;
  msg: 'OK';
  data: {
    total: number;
    rows: ReviewRow[];
  };
}
