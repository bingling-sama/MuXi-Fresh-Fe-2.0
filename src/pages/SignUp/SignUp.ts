export interface SendEmailResult {
  code: 200;
  msg: 'OK';
  data: {
    flag: boolean;
  };
}

export interface SignUpResult {
  code: 200;
  msg: 'OK';
  data: {
    token: string;
  };
}
