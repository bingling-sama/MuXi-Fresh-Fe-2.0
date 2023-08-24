export interface AdminRow {
  avatar: string;
  email: string;
  name: string;
  nickname: string;
  user_id: string;
}

export interface AdminList {
  code: 0;
  msg: 'OK';
  data: {
    list: AdminRow[];
  };
}

export interface ChangeUserType {
  code: 0 | -1;
  msg: string;
  data: { list: null };
}
