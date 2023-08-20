import React, { useEffect, useState } from 'react';
import './index.less';
import backImg from '../../assets/images/form/back.png';
import checkedImg from '../../assets/images/form/checked.png';
import cameraImg from '../../assets/images/form/camera.png';
import muxiplanet from '../../assets/images/form/MuXi.png';
import avatarDefault from '../../assets/images/form/avatarDefault.png';
import { get, post, put } from '../../fetch';
import { ConfigProvider, Input, message, Radio, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import * as qiniu from 'qiniu-js';

const FormForMobile: React.FC = () => {
  const [qiniuToken, setQiniuToken] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [pageNum, setPageNum] = useState(0); //页数
  const [name, setName] = useState(''); //姓名
  const [nickname, setnickname] = useState('');
  const [avatar2, setavatar2] = useState('');
  const [sex, setsex] = useState(''); //性别
  const [avatar, setavatar] = useState<string | undefined>(avatarDefault);
  const [stu_number] = useState(''); //学号
  const [academy, setacademy] = useState('请选择'); //学院
  const [major, setmajor] = useState(''); //专业
  const [grade, setgrade] = useState('大一'); //年级
  const [contactWay, setcontactWay] = useState<{ [key: string]: string }>({
    email: '',
    qq: '',
    phone: '',
  }); //联系方式内容
  const [contactWayselect1, setcontactWayselect1] = useState('请选择'); //联系方式1
  const [contactWayselect2, setcontactWayselect2] = useState('选填'); //联系方式2
  const [reason, setreason] = useState(''); //心动原因
  const [knowledge, setknowledge] = useState(''); //组别了解
  const [wantGroup, setwantGroup] = useState('请选择'); //心动组别
  const [self_intro, setself_intro] = useState(''); //自我介绍
  const [extra_question, setextra_question] = useState(''); //额外问题
  const [formSetted, setformSetted] = useState<number>(-1);
  const [form_id, setform_id] = useState('');
  const turnNext = () => {
    setPageNum(pageNum + 1); //换页函数
  };
  const backPage = () => {
    setPageNum(pageNum - 1); //换页函数
  };
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
    } else void message.error('请选择心动组别');
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
    if (contactWayselect1 == 'email') void message.info('邮箱请在个人主页修改');
  }, [contactWayselect1]);
  useEffect(() => {
    if (contactWayselect2 == 'email') void message.info('邮箱请在个人主页修改');
  }, [contactWayselect2]);
  useEffect(() => {
    const formdata = get(`/form/view?entry_form_id=myself`);
    formdata
      .then((data: FormData) => {
        if (data.code == 0) {
          setavatar(data.data.avatar);
          setformSetted(data.code);
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
  const element: JSX.Element[] = [];
  element[0] = (
    <div className="page_formM">
      <img src={backImg} className="returnBtn_formM"></img>
      <div className="top_title_formM">报名表</div>
      <div className="details_formM formImg">完善你的简历</div>
      <div className="details_formM break_formM">让木犀团队更好地了解你吧</div>
      <div className="mainbox_formM firstbox_formM">
        <ImgCrop>
          <Upload<ResponseType>
            action={uploadUrl}
            data={{ token: qiniuToken }}
            fileList={fileList}
            onChange={onChange}
            showUploadList={false}
            maxCount={1}
          >
            <div className="avatar_formM">
              <img src={avatar} alt="" />
            </div>
          </Upload>
        </ImgCrop>
        <img src={cameraImg} alt="" className="cameraImg" />
        <div className="box_detail_formM">点击上传你的照片</div>
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">姓名</div>
        </div>
        <Input
          className="input_formM"
          placeholder="请输入你的真实姓名"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">性别</div>
        </div>
        <div className="sexbox_formM">
          <div
            className="sexboxleft male"
            onClick={() => {
              setsex('male');
            }}
            style={{
              backgroundColor: sex == 'male' ? '' : '#F5F5F5',
              border: sex == 'male' ? '2px solid #5858AF' : '',
            }}
          >
            <div className="enmale">Male</div>
            <div className="cnmale">男生</div>
          </div>
          {sex == 'male' ? <img className="checkedImg" src={checkedImg}></img> : ''}
        </div>
        <div className="sexbox_formM">
          <div
            className="sexboxleft female"
            onClick={() => {
              setsex('female');
            }}
            style={{
              backgroundColor: sex == 'female' ? '' : '#F5F5F5',
              border: sex == 'female' ? '2px solid #5858AF' : '',
            }}
          >
            <div className="enmale">Female</div>
            <div className="cnmale">女生</div>
          </div>
          {sex == 'female' ? <img className="checkedImg" src={checkedImg}></img> : ''}
        </div>
        <button
          className="change_next_formM"
          disabled={name && sex ? false : true}
          onClick={turnNext}
          style={
            name && sex
              ? { backgroundColor: '#FFC93F', color: '#413E55' }
              : { backgroundColor: '#DADADA', color: '#FFFFFF' }
          }
        >
          开始报名
        </button>
      </div>
    </div>
  );
  element[1] = (
    <div className="page_formM">
      <img src={backImg} className="returnBtn_formM" onClick={backPage}></img>
      <div className="top_title_formM">个人信息</div>
      <div className="mainbox_formM">
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">学号</div>
        </div>
        <Input
          className="input_formM"
          type="text"
          value={stu_number}
          onClick={() => void message.info('学号请在个人主页修改')}
        />
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">学院</div>
        </div>
        <select
          id="schoolSelect_formM"
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
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">专业</div>
        </div>
        <Input
          className="input_formM"
          placeholder="请输入你的专业"
          type="text"
          value={major}
          onChange={(e) => {
            setmajor(e.target.value);
          }}
        />
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">年级</div>
        </div>
        <select
          id="GradeSelect_formM"
          value={grade}
          onChange={(e) => setgrade(e.target.value)}
        >
          <option value="大一">大一</option>
          <option value="大二">大二</option>
          <option value="大三">大三</option>
          <option value="大四">大四</option>
          <option value="研一">研一</option>
          <option value="研二">研二</option>
        </select>
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">联系方式</div>
        </div>
        <div className="contactWaybox_formM">
          <div className="contactWayterm_formM">
            <select
              id="contactWayselect1_formM"
              value={contactWayselect1}
              onChange={(e) => {
                setcontactWayselect1(e.target.value);
              }}
            >
              <option value="请选择" disabled>
                请选择
              </option>
              <option value="email">邮箱</option>
              <option value="qq">QQ</option>
              <option value="phone">手机</option>
            </select>
            <Input
              type="text"
              className="contactContent_formM"
              placeholder="请输入"
              name={contactWayselect1}
              value={contactWay[contactWayselect1]}
              onChange={(e) =>
                setcontactWay((pre) => ({ ...pre, [e.target.name]: e.target.value }))
              }
            />
          </div>
          <div className="contactWayterm_formM">
            <select
              id="contactWayselect2_formM"
              value={contactWayselect2}
              onChange={(e) => setcontactWayselect2(e.target.value)}
            >
              <option value="选填" disabled>
                选填
              </option>
              <option value="email">邮箱</option>
              <option value="qq">QQ</option>
              <option value="phone">手机</option>
            </select>
            <Input
              type="text"
              className="contactContent_formM"
              name={contactWayselect2}
              value={contactWay[contactWayselect2]}
              onChange={(e) =>
                setcontactWay((pre) => ({ ...pre, [e.target.name]: e.target.value }))
              }
            />
          </div>
        </div>
        <button className="change_next_formM" onClick={turnNext}>
          Next →
        </button>
      </div>
    </div>
  );
  element[2] = (
    <div className="page_formM">
      <img src={backImg} className="returnBtn_formM" onClick={backPage}></img>
      <div className="top_title_formM">报名信息</div>
      <img src="" alt="" />
      <div className="mainbox_formM">
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">心动组别</div>
        </div>
        <select
          id="GroupSelect_formM"
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
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">心动理由</div>
        </div>
        <textarea
          name=""
          id="group_reason_formM"
          placeholder="请输入你的理由"
          value={reason}
          onChange={(e) => setreason(e.target.value)}
        ></textarea>
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">对组别的认识</div>
        </div>
        <textarea
          name=""
          id="group_know_formM"
          placeholder="请输入你对所选组别的了解"
          value={knowledge}
          onChange={(e) => setknowledge(e.target.value)}
        ></textarea>
        <button className="change_next_formM" onClick={turnNext}>
          Next →
        </button>
      </div>
    </div>
  );
  element[3] = (
    <div className="page_formM">
      <img src={backImg} className="returnBtn_formM" onClick={backPage}></img>
      <div className="top_title_formM">个人自述</div>
      <div className="mainbox_formM">
        <div className="self_tip">
          <span className="yellow">提示: </span>
          <span className="grey">
            进行一个自我介绍，内容需要包含自己的性格、能力、获得过的相关的成就以及假如自己进入木犀后的想法，可加入其他内容。
          </span>
        </div>
        <div className="term_detail_box_formM">
          <div className="yellowBot"></div>
          <div className="term_detail_formM">自我介绍</div>
        </div>
        <textarea
          name=""
          id="self_introduction_formM"
          placeholder=" "
          value={self_intro}
          onChange={(e) => setself_intro(e.target.value)}
        ></textarea>
        <button className="change_next_formM" onClick={turnNext}>
          Next →
        </button>
      </div>
    </div>
  );
  element[4] = (
    <div className="page_formM">
      <img src={backImg} className="returnBtn_formM" onClick={backPage}></img>
      <img className="muxiplanet" src={muxiplanet} alt="" />
      <div className="top_title_formM">小问题</div>
      <div className="mainbox_formM lastbox_formM">
        <div className="questionbox_formM">
          <span
            className="yellowBot"
            style={{ display: 'inline-block', marginLeft: '6vw', marginRight: '3vw' }}
          ></span>
          <span className="question_formM">
            你是否有加入/正在加入一些其他组织或担任学生工作
          </span>
        </div>
        <div className="answerbox_formM">
          <Radio.Group
            onChange={(e) => setextra_question(e.target.value as string)}
            value={extra_question}
          >
            <Radio value={'Y'}>是</Radio>
            <Radio value={'N'}>否</Radio>
          </Radio.Group>
        </div>

        <button className="change_next_formM" onClick={formSetted ? setForm : changeForm}>
          提交报名表
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ffb841',
          },
        }}
      >
        {element[pageNum]}
      </ConfigProvider>
    </div>
  );
};
export default FormForMobile;
