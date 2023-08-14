export interface UserInfo {
  avatar: string;
  name: string;
  nickname: string;
  school: string;
  email: string;
  group: string;
  student_id: string;
  qq: string;
}

export interface GetUserInfoResult {
  code: 0;
  msg: 'OK';
  data: UserInfo;
}

export interface GetQiniuTokenResult {
  code: 0;
  msg: 'OK';
  data: {
    QiniuToken: string;
  };
}

export interface ChangeEmailResult {
  code: 0;
  msg: 'OK';
  data: {
    flag: boolean;
  };
}
