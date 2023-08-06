import React, { CSSProperties, useState, useEffect, ChangeEvent } from 'react';
import { ConfigProvider, Input, UploadProps } from 'antd';
import './index.less';
import Uploader from '../upload';

const { TextArea } = Input;
type InputType = 'input' | 'textarea' | 'file';

export interface InputProps {
  type: InputType;
  label: string;
  placeHolder?: string;
  style?: CSSProperties;
  defaultValue: string[];
  className?: string;
  limit?: number;
  innerClassName?: string;
  task_id?: string;
  disabled?: boolean;
  onChange: (form: string | string[] | UploadProps['fileList']) => void;
}
type tmpProps = {
  value: any;
  list: string[];
};
const InputBox: React.FC<InputProps> = (props) => {
  const [flag, setFlag] = useState<number>(0);
  const [tmpdefault, settmpdefault] = useState<tmpProps>({ value: {}, list: [] });
  const [def, setdef] = useState<any>(['']);
  const {
    defaultValue,
    disabled,
    type,
    style,
    className,
    label,
    placeHolder,
    limit,
    innerClassName,
    onChange,
  } = props;
  useEffect(() => {
    if (def[0] != defaultValue[0]) {
      settmpdefault({ value: { value: defaultValue[0] }, list: defaultValue });
      setdef(defaultValue);
      type !== 'file' && onChange(defaultValue[0]);
    }
  }, [defaultValue, def, onChange, type]);
  useEffect(() => {
    type != 'file' && setFlag((type === 'input' ? 1 : 0) + 1);
  }, [type]);
  const handleChangeFile = (files: UploadProps['fileList']) => {
    onChange(files);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    settmpdefault({ value: { value: e.target.value }, list: tmpdefault.list });
    onChange(e.target.value);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F79B2E',
        },
      }}
    >
      <div className={'input-wrap' + ' ' + (className as string)} style={style}>
        <div className="input-label">{label}</div>
        {flag == 2 ? (
          <Input
            disabled={disabled ? disabled : false}
            placeholder={placeHolder}
            allowClear
            className={'input-element ' + (innerClassName as string)}
            maxLength={limit}
            onChange={handleChangeInput}
            showCount={typeof limit != 'undefined'}
          ></Input>
        ) : !flag ? (
          <Uploader
            disabled={disabled ? disabled : false}
            onChange={handleChangeFile}
            defaultList={tmpdefault.list}
            className={'upload-element ' + (innerClassName as string)}
          ></Uploader>
        ) : (
          <TextArea
            disabled={disabled ? disabled : false}
            placeholder={defaultValue[0]}
            allowClear
            className={'textarea-element ' + (innerClassName as string)}
            style={{ resize: 'none' }}
            maxLength={limit}
            onChange={handleChangeInput}
            {...tmpdefault.value}
            showCount={typeof limit != 'undefined'}
          ></TextArea>
        )}
      </div>
    </ConfigProvider>
  );
};

export default InputBox;
