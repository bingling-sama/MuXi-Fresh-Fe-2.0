import { Group } from '../pages/Review/ReviewFitler.ts';

export interface PersonalInformation {
  code: 0;
  msg: 'OK';
  data: {
    avatar: string;
    email: string;
    group: Group;
    nickname: string;
    student_id: string;
  };
}
