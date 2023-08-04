import React, { useState, CSSProperties } from 'react';
import { Card, UploadProps } from 'antd';
import InputBox from '../input';
import './index.less';
import Submit from '../button';
import DropDown from '../dropDown';
import Title from '../title';
import { taskListType, choiceType } from '../../../types';
interface UploadSectionProps {
  title?: string;
  status?: boolean;
  className?: string;
  style?: CSSProperties;
  button_title?: string;
  choice: choiceType;
  taskList?: taskListType[];
  loading?: boolean;
  onSubmit?: (query: any) => void;
  children?: React.ReactNode;
  submitClass?: string;
  onSwitch?: (item: any) => void;
}

type defaultType = {
  title_text: string;
  content: string;
  urls: string[];
};
const UploadSection: React.FC<UploadSectionProps> = (props) => {
  const {
    title,
    onSwitch,
    submitClass,
    children,
    onSubmit,
    loading,
    status,
    className,
    style,
    button_title,
    choice,
    taskList,
  } = props;
  const [formData, setformData] = useState<any>();
  const [defaultValue, setDefaultValue] = useState<defaultType>({
    title_text: '',
    content: '',
    urls: [''],
  });
  const [formTitle, setFormTitle] = useState<any>();
  const [formContent, setFormContent] = useState<string>();
  const root = 'http://ossfresh-test.muxixyz.com/';

  const handleChangeTitle = (e: taskListType) => {
    if (choice.includes('edit')) {
      setFormTitle({ title_text: e.text, assignedTaskID: e.id });
      return;
    }
    setFormTitle({ title_text: e.text });
  };
  const handleSwitch = (e: defaultType, id: string) => {
    if (e) {
      setDefaultValue(e);
      onSwitch && onSwitch(id);
    }
  };
  const handleChangeContent = (e: string) => {
    setFormContent(e);
  };
  const handleChangeUpload = (e: UploadProps['fileList']) => {
    const tmpList = e?.map((item) => {
      if (item?.response) return `${root} ${item.response.key as string}`;
      else return item.name;
    });
    setformData(tmpList);
  };
  const handleSubmit = () => {
    const query = {
      ...formTitle,
      content: formContent,
      urls: formData,
    };
    onSubmit && onSubmit(query);
  };

  return (
    <>
      <Card
        title={
          <Title
            extra={
              <>
                {typeof status != 'undefined' && (
                  <div className="upload-status">{status ? `已提交` : `未提交`}</div>
                )}
              </>
            }
            title={title}
          ></Title>
        }
        className={'upload-wrap ' + (className as string)}
        style={style}
        loading={loading}
      >
        <div className="upload-upload">
          {choice.includes('new') ? (
            <InputBox
              defaultValue={[defaultValue.title_text]}
              label="标题"
              type="input"
              className="inp more"
              limit={30}
              onChange={(str) => handleChangeTitle({ id: '', text: str as string })}
            ></InputBox>
          ) : (
            <DropDown
              type={choice.includes('user') ? 'user' : 'admin'}
              onSwitch={handleSwitch}
              data={taskList as taskListType[]}
              onChoose={(e) => handleChangeTitle(e)}
            ></DropDown>
          )}
          <InputBox
            label="内容简介"
            type="textarea"
            className="inp"
            limit={500}
            defaultValue={[defaultValue.content]}
            onChange={(str) => handleChangeContent(str as string)}
            task_id={formData?.assignedTaskID}
            disabled={choice.includes('user') ? true : false}
          ></InputBox>
          <InputBox
            label="附件"
            type="file"
            className="inp"
            onChange={(files) => handleChangeUpload(files as UploadProps['fileList'])}
            defaultValue={defaultValue.urls}
            disabled={choice.includes('user') ? true : false}
          ></InputBox>
          {children}
          <Submit
            className={`submit-page  ${submitClass as string}`}
            onClick={handleSubmit}
          >
            {button_title}
          </Submit>
        </div>
      </Card>
    </>
  );
};

export default UploadSection;
