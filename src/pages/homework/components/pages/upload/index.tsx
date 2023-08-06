import React, { useEffect, useState } from 'react';
import { Upload, message, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as qiniu from 'qiniu-js';
import axiosInstance from '../../../../../services/interceptor';
import Submit from '../button';
import './index.less';
interface UploaderProps {
  className?: string;
  onChange: (files: UploadProps['fileList']) => void;
  defaultList?: string[];
  disabled?: boolean;
}

const Uploader: React.FC<UploaderProps> = (props) => {
  const [qntoken, setQntoken] = useState<string>('');
  const { className, onChange, defaultList, disabled } = props;
  const [fileList, setfileList] = useState<any[] | undefined>([]);
  useEffect(() => {
    axiosInstance.get('/auth/get-qntoken').then((res) => {
      setQntoken(res.data.data.QiniuToken as string);
    });
  }, []);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (defaultList) {
      const tmp = defaultList
        .filter((item) => item)
        ?.map((item, index) => {
          return {
            uid: `${Date.now()}${item}`,
            name: item.split('--')[1] ? item.split('--')[1] : `file-${index}`,
            status: 'done',
            url: item,
          };
        });
      console.log('tmp[0]', tmp[0]);

      onChange(tmp as any[]);
      setfileList(tmp[0] ? tmp : []);
    }
  }, [defaultList]);
  const handleFileChange: UploadProps['onChange'] = (info) => {
    setfileList(info.fileList);
    if (info.file.status === 'done') {
      onChange(info.fileList);
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };
  const handleRemove = (file: any) => {
    if (fileList) {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setfileList(newFileList);
      onChange(newFileList);
    }
  };
  const customRequest = (options: any) => {
    const putExtra = {
      fname: `${Date.now()}--${options.file.name as string}`,
    };
    const config = {};

    const observable = qiniu.upload(
      options.file as File,
      `${Date.now()}--${options.file.name as string}`,
      qntoken,
      putExtra,
      config,
    );
    // 监听上传
    const subscription: any = observable.subscribe({
      next: (res) => {
        options.onProgress({ percent: res.total.percent });
      },
      error: (err) => {
        options.onError(err);
        if (subscription) {
          subscription.unsubscribe();
        }
      },
      complete: (res) => {
        options.onSuccess(res);
        if (subscription) {
          subscription.unsubscribe();
        }
      },
    });
  };
  return (
    <Upload
      customRequest={customRequest}
      onChange={handleFileChange}
      onRemove={handleRemove}
      showUploadList={true}
      multiple={true}
      className={`def-upload ${className as string}`}
      fileList={fileList}
      disabled={disabled ? disabled : false}
    >
      {
        <Submit
          className="def-button"
          disabled={disabled ? disabled : false}
          icon={<UploadOutlined />}
        >
          上传
        </Submit>
      }
    </Upload>
  );
};

export default Uploader;
