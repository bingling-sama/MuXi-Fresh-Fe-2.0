export interface CodeImg {
  code: 200;
  msg: 'OK';
  data: {
    image_base64: string;
    image_id: string;
  };
}

export interface VerifyResult {
  code: 200;
  msg: 'OK';
  data: {
    flag: boolean;
  };
}
