export interface UserJudge {
  code: number;
  msg: 'OK';
  data: {
    form_status: UserIsForm;
    user_type: UserIdentity;
  };
}

export type UserIdentity = 'super_admin' | 'admin' | 'normal' | 'freshman';
export type UserIsForm = '已交表' | '未交表';
