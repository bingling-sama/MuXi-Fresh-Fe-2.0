export interface CodeImg {
  code: 0;
  msg: 'OK';
  data: {
    image_base64: string;
    image_id: string;
  };
}

export interface VerifyResult {
  code: 0;
  msg: 'OK';
  data: {
    flag: boolean;
  };
}
