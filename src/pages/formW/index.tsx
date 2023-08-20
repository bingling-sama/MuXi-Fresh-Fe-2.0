import React, { useEffect, useState } from 'react';
import { get, post, put } from '../../fetch';
import './index.less';
import {
  ConfigProvider,
  Input,
  message,
  Radio,
  Select,
  Space,
  Upload,
  Watermark,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import * as qiniu from 'qiniu-js';
import AvatarDefault from '../../assets/images/form/avatarDefaultW.png';

const FormForWeb: React.FC = () => {
  const [qiniuToken, setQiniuToken] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [name, setName] = useState(''); //姓名
  const [sex, setsex] = useState('请选择'); //性别
  const [nickname, setnickname] = useState('');
  const [avatar2, setavatar2] = useState('');
  const [avatar, setavatar] = useState<string | undefined>(AvatarDefault);
  const [stu_number] = useState(''); //学号
  const [academy, setacademy] = useState('请选择'); //学院
  const [major, setmajor] = useState(''); //专业
  const [grade, setgrade] = useState('大一'); //年级
  const [contactWay, setcontactWay] = useState<{ [key: string]: string }>({
    email: '',
    qq: '',
    phone: '',
  }); //联系方式内容
  const [contactWayselect1, setcontactWayselect1] = useState('联系方式1'); //联系方式1
  const [contactWayselect2, setcontactWayselect2] = useState('联系方式2'); //联系方式2
  const [reason, setreason] = useState(''); //心动原因
  const [knowledge, setknowledge] = useState(''); //组别了解
  const [wantGroup, setwantGroup] = useState('请选择'); //心动组别
  const [self_intro, setself_intro] = useState(''); //自我介绍
  const [extra_question, setextra_question] = useState(''); //额外问题
  const [formSetted, setformSetted] = useState<number>(0);
  const [form_id, setform_id] = useState('');
  interface FormData {
    code: number;
    data: {
      avatar: string;
      extra_question: string;
      gender: string;
      grade: string;
      group: string;
      knowledge: string;
      major: string;
      phone: string;
      reason: string;
      self_intro: string;
      form_id: string;
    };
  }
  interface User {
    code: number;
    data: {
      avatar: string;
      email: string;
      group: string;
      name: string;
      nickname: string;
      qq: string;
      school: string;
      student_id: string;
    };
  }
  interface GetQiniuTokenResult {
    code: 0;
    msg: 'OK';
    data: {
      QiniuToken: string;
    };
  }
  interface res {
    code: number;
  }
  const setForm = () => {
    if (wantGroup != '请选择') {
      post(`/form/`, {
        avatar: avatar,
        major: major,
        grade: grade,
        gender: sex,
        phone: contactWay['phone'],
        group: wantGroup,
        reason: reason,
        knowledge: knowledge,
        self_intro: self_intro,
        extra_question: extra_question,
      })
        .then((data: res) => {
          if (data.code === 0) void message.success('提交成功^_^');
          else void message.error('提交失败，请重试');
        })
        .catch((e) => {
          console.error(e);
        });
      post('/users/', {
        avatar: avatar2,
        name: name,
        nickname: nickname,
        qq: contactWay['qq'],
        school: academy,
      }).catch((e) => {
        console.error(e);
      });
    } else void message.warning('请选择心动组别！');
  };
  const changeForm = () => {
    put(`/form/`, {
      form_id: form_id,
      avatar: avatar,
      major: major,
      grade: grade,
      gender: sex,
      phone: contactWay['phone'],
      group: wantGroup,
      reason: reason,
      knowledge: knowledge,
      self_intro: self_intro,
      extra_question: extra_question,
    })
      .then((data: res) => {
        if (data.code === 0) void message.success('提交成功^_^');
        else void message.error('提交失败，请重试');
      })
      .catch((e) => {
        console.error(e);
      });
    post('/users/', {
      avatar: avatar2,
      name: name,
      nickname: nickname,
      qq: contactWay['qq'],
      school: academy,
    }).catch((e) => {
      console.error(e);
    });
  };
  useEffect(() => {
    const formdata = get(`/form/view?entry_form_id=myself`);
    formdata
      .then((data: FormData) => {
        if (data.code == 0) {
          setformSetted(data.code);
          setavatar(data.data.avatar);
          setform_id(data.data.form_id);
          setsex(data.data.gender);
          setmajor(data.data.major);
          setgrade(data.data.grade);
          setcontactWay((pre) => ({ ...pre, ['phone']: data.data.phone }));
          setwantGroup(data.data.group);
          setreason(data.data.reason);
          setknowledge(data.data.knowledge);
          setself_intro(data.data.self_intro);
          setextra_question(data.data.extra_question);
        }
      })
      .catch((e) => {
        console.error(e);
      });
    const userdata = get(`/users/my-info`);
    userdata
      .then((data: User) => {
        setName(data.data.name);
        setnickname(data.data.nickname);
        setavatar2(data.data.avatar);
        setacademy(data.data.school);
        setcontactWay((pre) => ({
          ...pre,
          ['qq']: data.data.qq,
          ['email']: data.data.email,
        }));
      })
      .catch((e) => {
        console.error(e);
      });
    void get('/auth/get-qntoken', true).then((r: GetQiniuTokenResult) => {
      const { QiniuToken } = r.data;
      setQiniuToken(QiniuToken);
      const config = {
        useCdnDomain: true,
        region: qiniu.region.z2,
      };
      void qiniu.getUploadUrl(config, QiniuToken).then((r) => {
        setUploadUrl(r);
        console.log(r);
      });
    });
  }, []);
  interface ResponseType {
    key: string;
    hash: string;
  }

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps<ResponseType>['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const response = newFileList[0].response;
    console.log(response);
    if (response) {
      const avatar = `http://ossfresh-test.muxixyz.com/${response.key}`;
      setavatar(avatar);
    }
  };
  useEffect(() => {
    if (contactWayselect1 == 'email') void message.info('邮箱请在个人主页修改');
  }, [contactWayselect1]);
  useEffect(() => {
    if (contactWayselect2 == 'email') void message.info('邮箱请在个人主页修改');
  }, [contactWayselect2]);
  return (
    <div className="FormWebpage">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ffb841',
          },
        }}
      >
        <Watermark content="MUXI-STUDIO" style={{ width: '1190px' }}>
          <div className="FromForWeb">
            <div className="title_formweb">个人信息</div>
            <div className="personInformationbox">
              <ImgCrop>
                <Upload<ResponseType>
                  action={uploadUrl}
                  data={{ token: qiniuToken }}
                  fileList={fileList}
                  onChange={onChange}
                  showUploadList={false}
                  maxCount={1}
                >
                  <div className="avatar_formweb">
                    <img src={avatar} />
                  </div>
                </Upload>
              </ImgCrop>
              <div className="personInfoContent">
                <div className="term_formweb">
                  <div className="detail_formweb">姓名:</div>
                  <Input
                    className="input_formweb"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="term_formweb">
                  <div className="detail_formweb">性别:</div>
                  <Space wrap>
                    <Select
                      size="large"
                      className="select_formweb"
                      defaultValue=""
                      value={sex}
                      onChange={(e) => setsex(e)}
                      options={[
                        { value: 'male', label: '男生' },
                        { value: 'female', label: '女生' },
                      ]}
                    />
                  </Space>
                </div>
              </div>
              <div className="personInfoContent">
                <div className="term_formweb">
                  <div className="detail_formweb">学号:</div>
                  <Input
                    className="input_formweb"
                    type="text"
                    value={stu_number}
                    onClick={() => void message.info('学号请在个人主页修改')}
                  />
                </div>
                <div className="term_formweb">
                  <div className="detail_formweb">年级:</div>
                  <Space wrap>
                    <Select
                      size="large"
                      className="select_formweb"
                      defaultValue="大一"
                      value={grade}
                      onChange={(e) => setgrade(e)}
                      options={[
                        { value: '大一', label: '大一' },
                        { value: '大二', label: '大二' },
                        { value: '大三', label: '大三' },
                        { value: '大四', label: '大四' },
                        { value: '研一', label: '研一' },
                        { value: '研二', label: '研二' },
                      ]}
                    />
                  </Space>
                </div>
              </div>
              <div className="personInfoContent">
                <div className="term_formweb">
                  <div className="detail_formweb">学院:</div>
                  <Space wrap>
                    <Select
                      size="large"
                      id="academy"
                      defaultValue=""
                      style={{ width: '180px' }}
                      value={academy}
                      onChange={(e) => setacademy(e)}
                      className="select_formweb"
                    >
                      <Select.Option value="计算机学院">计算机学院</Select.Option>
                      <Select.Option value="人工智能教育学部">
                        人工智能教育学部
                      </Select.Option>
                      <Select.Option value="心理学院">心理学院</Select.Option>
                      <Select.Option value="经济与工商管理学院">
                        经济与工商管理学院
                      </Select.Option>
                      <Select.Option value="公共管理学院">公共管理学院</Select.Option>
                      <Select.Option value="信息管理学院">信息管理学院</Select.Option>
                      <Select.Option value="城市与环境科学学院">
                        城市与环境科学学院
                      </Select.Option>
                      <Select.Option value="美术学院">美术学院</Select.Option>
                      <Select.Option value="新闻传播学院">新闻传播学院</Select.Option>
                      <Select.Option value="政治与国际关系学院">
                        政治与国际关系学院
                      </Select.Option>
                      <Select.Option value="教育学院">教育学院</Select.Option>
                      <Select.Option value="文学院">文学院</Select.Option>
                      <Select.Option value="新闻传播学院">新闻传播学院</Select.Option>
                      <Select.Option value="历史文化学院">历史文化学院</Select.Option>
                      <Select.Option value="马克思主义学院">马克思主义学院</Select.Option>
                      <Select.Option value="法学院">法学院</Select.Option>
                      <Select.Option value="社会学院">社会学院</Select.Option>
                      <Select.Option value="外国语学院">外国语学院</Select.Option>
                      <Select.Option value="音乐学院">音乐学院</Select.Option>
                      <Select.Option value="数学与统计学学院">
                        数学与统计学学院
                      </Select.Option>
                      <Select.Option value="物理科学与技术学院">
                        物理科学与技术学院
                      </Select.Option>
                      <Select.Option value="化学学院">化学学院</Select.Option>
                    </Select>
                  </Space>
                </div>
                <div className="term_formweb">
                  <div className="detail_formweb">专业:</div>
                  <Input
                    type="text"
                    className="input_formweb"
                    value={major}
                    style={{ width: '180px' }}
                    onChange={(e) => {
                      setmajor(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="personInfoContent">
                <div className="contactWayterm">
                  <Space wrap>
                    <Select
                      style={{ width: '120px', textAlign: 'center' }}
                      value={contactWayselect1}
                      onChange={(value) => setcontactWayselect1(value)}
                      options={[
                        { value: 'email', label: '邮箱' },
                        { value: 'qq', label: 'QQ' },
                        { value: 'phone', label: '手机' },
                      ]}
                    />
                  </Space>
                  <Input
                    style={{ width: '180px' }}
                    type="text"
                    className="contactContent input_formweb"
                    name={contactWayselect1}
                    value={contactWay[contactWayselect1]}
                    onChange={(e) =>
                      setcontactWay((pre) => ({
                        ...pre,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="contactWayterm">
                  <Space wrap>
                    <Select
                      style={{ width: '120px', textAlign: 'center' }}
                      value={contactWayselect2}
                      onChange={(value) => setcontactWayselect2(value)}
                      options={[
                        { value: 'email', label: '邮箱' },
                        { value: 'qq', label: 'QQ' },
                        { value: 'phone', label: '手机' },
                      ]}
                    />
                  </Space>
                  <Input
                    style={{ width: '180px' }}
                    type="text"
                    className="contactContent input_formweb"
                    name={contactWayselect2}
                    value={contactWay[contactWayselect2]}
                    onChange={(e) =>
                      setcontactWay((pre) => ({
                        ...pre,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="title_formweb">报名信息</div>
            <div className="registerInformationbox">
              <div className="term_formweb wantGroup">
                <div className="detail_formweb">心动组别:</div>

                <Space wrap>
                  <Select
                    style={{ width: '120px', textAlign: 'center' }}
                    id="GroupSelect"
                    value={wantGroup}
                    onChange={(e) => setwantGroup(e)}
                    options={[
                      { value: 'Product', label: '产品组' },
                      { value: 'Design', label: '设计组' },
                      { value: 'Frontend', label: '前端组' },
                      { value: 'Backend', label: '后端组' },
                      { value: 'Android', label: '安卓组' },
                    ]}
                  />
                </Space>
              </div>
              <div className="reasonbox">
                <div className="detail_formweb">心动理由:</div>
                <Input
                  className="textarea_formweb"
                  name=""
                  id="group_reason"
                  placeholder="请输入你的心动理由"
                  value={reason}
                  onChange={(e) => setreason(e.target.value)}
                ></Input>
              </div>
              <div className="knowledgebox">
                <div className="detail_formweb">对组别的认识:</div>
                <Input
                  className="textarea_formweb"
                  name=""
                  id="group_knowledge"
                  placeholder="请输入你对所选组别的了解"
                  value={knowledge}
                  onChange={(e) => setknowledge(e.target.value)}
                ></Input>
              </div>
              <div className="self_introbox">
                <div className="detail_formweb">自我介绍:</div>
                <Input
                  className="textarea_formweb"
                  name=""
                  id="self_inro"
                  placeholder="进行一个自我介绍，内容需要包含自己的性格、能力、获得过的相关的成就以及假如自己进入木犀后的想法，可加入其他内容。"
                  value={self_intro}
                  onChange={(e) => setself_intro(e.target.value)}
                ></Input>
              </div>
              <div className="questionbox_formweb">
                你是否有加入/正在加入一些其他组织或担任学生工作?
                <div className="answerbox_formweb">
                  <Radio.Group
                    buttonStyle="solid"
                    onChange={(e) => setextra_question(e.target.value as string)}
                    value={extra_question}
                  >
                    <Radio value={'Y'}>是</Radio>
                    <Radio value={'N'}>否</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="send_formweb" onClick={formSetted ? setForm : changeForm}>
              完成修改
            </div>
          </div>
        </Watermark>
      </ConfigProvider>
    </div>
  );
};

export default FormForWeb;
