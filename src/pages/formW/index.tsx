import React, { useEffect, useState } from 'react';
import { get, post, put } from '../../fetch';
import './index.less';
import { message, Upload, Watermark } from 'antd';
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
  return (
    <div className="page">
      <Watermark content="MUXI-STUDIO" style={{ width: '1190px' }}>
        <div className="FromForWeb">
          <div className="title">个人信息</div>
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
                <div className="avatar">
                  <img src={avatar} alt="点击上传照片" />
                </div>
              </Upload>
            </ImgCrop>
            <div className="personInfoContent">
              <div className="term">
                <div className="detail">姓名:</div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="term">
                <div className="detail">性别:</div>
                <select id="sex" value={sex} onChange={(e) => setsex(e.target.value)}>
                  <option value="请选择" disabled>
                    请选择
                  </option>
                  <option value="male">男生</option>
                  <option value="female">女生</option>
                </select>
              </div>
            </div>
            <div className="personInfoContent">
              <div className="term">
                <div className="detail">学号:</div>
                <input
                  type="text"
                  value={stu_number}
                  onClick={() => void message.warning('学号请在个人主页修改')}
                />
              </div>
              <div className="term"></div>
            </div>
            <div className="personInfoContent">
              <div className="term">
                <div className="detail">学院:</div>
                <select
                  id="sex"
                  value={academy}
                  onChange={(e) => setacademy(e.target.value)}
                >
                  <option value="请选择" disabled>
                    请选择
                  </option>
                  <option value="计算机学院">计算机学院</option>
                  <option value="人工智能教育学部">人工智能教育学部</option>
                  <option value="心理学院">心理学院</option>
                  <option value="经济与工商管理学院">经济与工商管理学院</option>
                  <option value="公共管理学院">公共管理学院</option>
                  <option value="信息管理学院">信息管理学院</option>
                  <option value="城市与环境科学学院">城市与环境科学学院</option>
                  <option value="美术学院">美术学院</option>
                  <option value="新闻传播学院">新闻传播学院</option>
                  <option value="政治与国际关系学院">政治与国际关系学院</option>
                  <option value="教育学院">教育学院</option>
                  <option value="文学院">文学院</option>
                  <option value="新闻传播学院">新闻传播学院</option>
                  <option value="历史文化学院">历史文化学院</option>
                  <option value="马克思主义学院">马克思主义学院</option>
                  <option value="法学院">法学院</option>
                  <option value="社会学院">社会学院</option>
                  <option value="外国语学院">外国语学院</option>
                  <option value="音乐学院">音乐学院</option>
                  <option value="数学与统计学学院">数学与统计学学院</option>
                  <option value="物理科学与技术学院">物理科学与技术学院</option>
                  <option value="化学学院">化学学院</option>
                </select>
              </div>
              <div className="term">
                <div className="detail">专业:</div>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => {
                    setmajor(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="personInfoContent">
              <div className="contactWayterm">
                <select
                  id="contactWayselect1"
                  value={contactWayselect1}
                  onChange={(e) => {
                    setcontactWayselect1(e.target.value);
                  }}
                >
                  <option value="联系方式1" disabled>
                    联系方式1
                  </option>
                  <option value="email">邮箱</option>
                  <option value="qq">QQ</option>
                  <option value="phone">手机</option>
                </select>
                <input
                  type="text"
                  className="contactContent"
                  name={contactWayselect1}
                  value={contactWay[contactWayselect1]}
                  onChange={(e) =>
                    setcontactWay((pre) => ({ ...pre, [e.target.name]: e.target.value }))
                  }
                />
              </div>
              <div className="contactWayterm">
                <select
                  id="contactWayselect2"
                  value={contactWayselect2}
                  onChange={(e) => setcontactWayselect2(e.target.value)}
                >
                  <option value="联系方式2" disabled>
                    联系方式2
                  </option>
                  <option value="email">邮箱</option>
                  <option value="qq">QQ</option>
                  <option value="phone">手机</option>
                </select>
                <input
                  type="text"
                  className="contactContent"
                  name={contactWayselect2}
                  value={contactWay[contactWayselect2]}
                  onChange={(e) =>
                    setcontactWay((pre) => ({ ...pre, [e.target.name]: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="title">报名信息</div>
          <div className="registerInformationbox">
            <div className="term wantGroup">
              <div className="detail">心动组别:</div>
              <select
                id="GroupSelect"
                value={wantGroup}
                onChange={(e) => setwantGroup(e.target.value)}
              >
                <option value="请选择" disabled>
                  请选择
                </option>
                <option value="Product">产品组</option>
                <option value="Design">设计组</option>
                <option value="Frontend">前端组</option>
                <option value="Backend">后端组</option>
                <option value="Android">安卓组</option>
              </select>
            </div>
            <div className="reasonbox">
              <div className="detail">心动理由:</div>
              <textarea
                name=""
                id="group_reason"
                placeholder="请输入你的心动理由"
                value={reason}
                onChange={(e) => setreason(e.target.value)}
              ></textarea>
            </div>
            <div className="knowledgebox">
              <div className="detail">对组别的认识:</div>
              <textarea
                name=""
                id="group_knowledge"
                placeholder="请输入你对所选组别的了解"
                value={knowledge}
                onChange={(e) => setknowledge(e.target.value)}
              ></textarea>
            </div>
            <div className="self_introbox">
              <div className="detail">自我介绍:</div>
              <textarea
                name=""
                id="self_inro"
                placeholder="进行一个自我介绍，内容需要包含自己的性格、能力、获得过的相关的成就以及假如自己进入木犀后的想法，可加入其他内容。"
                value={self_intro}
                onChange={(e) => setself_intro(e.target.value)}
              ></textarea>
            </div>
            <div className="questionbox">
              你是否有加入/正在加入一些其他组织或担任学生工作?
              <div className="answerbox">
                <label>
                  <input
                    type="radio"
                    value="Y"
                    name="answer"
                    checked={extra_question === 'Y'}
                    onChange={() => setextra_question('Y')}
                    id=""
                  />
                  是
                </label>
                <label>
                  <input
                    type="radio"
                    value="N"
                    name="answer"
                    checked={extra_question === 'N'}
                    onChange={() => setextra_question('N')}
                    id=""
                  />
                  否
                </label>
              </div>
            </div>
          </div>
          <div className="send" onClick={formSetted ? setForm : changeForm}>
            完成修改
          </div>
        </div>
      </Watermark>
    </div>
  );
};

export default FormForWeb;
