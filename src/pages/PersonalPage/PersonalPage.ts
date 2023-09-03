export interface GetAuthSetPasswordResult {
  code: 200;
  msg: 'OK';
  data: {
    auth_set_password_token: string;
  };
}
