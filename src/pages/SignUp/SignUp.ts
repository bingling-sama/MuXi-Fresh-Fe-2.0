export interface SendEmailResult {
  code: 0;
  msg: 'OK';
  data: {
    flag: boolean;
  };
}

export interface SignUpResult {
  code: 0;
  msg: 'OK';
  data: {
    token: string;
  };
}
