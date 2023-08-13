export interface AdminRow {
  avatar: string;
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
