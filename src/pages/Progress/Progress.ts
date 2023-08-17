export interface Schedule {
  name: string;
  school: string;
  major: string;
  group: string;
  entry_form_status: string;
  admission_status: string;
}

export interface GetScheduleResult {
  code: 0;
  msg: 'OK';
  data: Schedule;
}
