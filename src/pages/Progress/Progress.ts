import { Group } from '../Review/ReviewFitler';

export interface Schedule {
  name: string;
  school: string;
  major: string;
  group: Group;
  entry_form_status: string;
  admission_status: string;
}

export interface GetScheduleResult {
  code: 200;
  msg: 'OK';
  data: Schedule;
}
