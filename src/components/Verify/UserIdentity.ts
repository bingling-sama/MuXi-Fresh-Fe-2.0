export interface UserJudge {
  code: 0 | -1;
  msg: 'OK';
  data: {
    form_status: UserIsForm;
    user_type: UserIdentity;
  };
}

export type UserIdentity = 'super_admin' | 'admin' | 'normal' | 'freshman';
export type UserIsForm = '已交表' | '未交表';
