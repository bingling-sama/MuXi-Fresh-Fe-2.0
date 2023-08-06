import { Group } from '../pages/Review/ReviewFitler.ts';

export interface PersonalInformation {
  code: 0;
  msg: 'OK';
  data: {
    avatar: string;
    nickname: string;
    email: string;
    group: Group;
    student_id: string;
  };
}
