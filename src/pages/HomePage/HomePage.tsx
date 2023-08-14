import React, { useEffect, useState } from 'react';
import { Input, message, Modal, Select } from 'antd';
import './Homepage.less';
import {
  ChangeEmailResult,
  GetQiniuTokenResult,
  GetUserInfoResult,
  UserInfo,
} from './UserInfo';
import { get, post } from '../../fetch';
import schoolData from './SchoolData';
import * as qiniu from 'qiniu-js';
import { nanoid } from 'nanoid';
import { SendEmailResult } from '../SignUp/SignUp';

const ShowInfo = ({ changeEditState }: { changeEditState: () => void }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    avatar: '',
    name: '',
    nickname: '',
    school: '',
    email: '',
    group: '',
    student_id: '',
    qq: '',
  });

  const [newEmail, setNewEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  // const [isIdModalOpen, setIsIdModalOpen] = useState(true);

  useEffect(() => {
    void get('/users/my-info', true).then(
      (r: GetUserInfoResult) => {
        const { data } = r;
        setUserInfo(data);
      },
      (e) => {
        console.log(e);
        void message.error('获取个人信息失败，请重试');
      },
    );
  }, []);

  const showEmailModal = () => {
    setIsEmailModalOpen(true);
  };

  const changeEmail = () => {
    const req = {
      email: newEmail,
      verify_code: verifyCode,
    };
    void post('/auth/email', req, true).then(
      (r: ChangeEmailResult) => {
        if (r.code === 0) {
          const email = newEmail;
          setUserInfo({ ...userInfo, email });
          void (r.data.flag && message.success('邮箱绑定成功！'));
          setNewEmail('');
          setVerifyCode('');
        } else {
          void message.error('邮箱绑定失败，请重试！');
          setNewEmail('');
          setVerifyCode('');
        }
      },
      (e) => {
        console.log(e);
        void message.error('邮箱绑定失败，请重试！');
        setNewEmail('');
        setVerifyCode('');
      },
    );
    setIsEmailModalOpen(false);
  };

  const cancelEmailModal = () => {
    setIsEmailModalOpen(false);
    setNewEmail('');
    setVerifyCode('');
  };

  const sendVerificationCode = () => {
    const req = {
      email: newEmail,
      type: 'set_email',
    };

    post('/auth/send-verification-code', req, false).then(
      (r: SendEmailResult) => {
        const { flag } = r.data;
        if (flag) {
          void message.success('验证码已发送！');
          // setIsSend(true);
        }
      },
      (e) => {
        console.log(e);
        void message.error('获取验证码失败，请重试');
      },
    );
  };

  return (
    <>
      <div className="detail-info-box">
        <div className="name-box">
          <div className="box-title">姓名:</div>
          <div className="box-content">{userInfo.name || '待补充'}</div>
        </div>
        <div className="nickName-box">
          <div className="box-title">昵称:</div>
          <div className="box-content">{userInfo.nickname || '待补充'}</div>
        </div>
        <div className="college-box">
          <div className="box-title">学院:</div>
          <div className="box-content">{userInfo.school || '待补充'}</div>
        </div>
        <div className="account-box">
          <div className="box-title">学号:</div>
          <div className="box-content">{userInfo.student_id || '未绑定'}</div>
          <div className="change-btn">修改</div>
        </div>
        <div className="email-box">
          <div className="box-title">邮箱:</div>
          <div className="box-content">{userInfo.email}</div>
          <div className="change-btn" onClick={showEmailModal}>
            修改
          </div>
        </div>
        <div className="qq-box">
          <div className="box-title">QQ:</div>
          <div className="box-content">{userInfo.qq || '待补充'}</div>
        </div>
        <div className="change-info-btn" onClick={changeEditState}>
          修改信息
        </div>
      </div>
      <Modal
        className="email-modal"
        open={isEmailModalOpen}
        onOk={changeEmail}
        onCancel={cancelEmailModal}
        okText="确认"
        cancelText="取消"
      >
        <div className="email-box">
          <div className="box-label">新邮箱:</div>
          <Input
            className="input-field"
            onChange={(e) => setNewEmail(e.target.value)}
            value={newEmail}
            type="email"
            placeholder="请输入邮箱"
          />
        </div>
        <div className="verifyCode-box">
          <div className="box-label">验证码:</div>
          <Input
            className="input-field"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
          />
          <div className="get-verifyCode-btn" onClick={sendVerificationCode}>
            获取验证码
          </div>
        </div>
      </Modal>
    </>
  );
};

const EditInfo = ({ changeEditState }: { changeEditState: () => void }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    avatar: '',
    name: '',
    nickname: '',
    school: '',
    email: '',
    group: '',
    student_id: '',
    qq: '',
  });

  const [newEmail, setNewEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  // const [isIdModalOpen, setIsIdModalOpen] = useState(true);

  useEffect(() => {
    void get('/users/my-info', true).then(
      (r: GetUserInfoResult) => {
        const { data } = r;
        setUserInfo(data);
      },
      (e) => {
        console.log(e);
        void message.error('获取个人信息失败，请重试');
      },
    );
  }, []);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setUserInfo({ ...userInfo, name });
  };

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setUserInfo({ ...userInfo, nickname });
  };

  const changeSchool = (value: string) => {
    const school = value;
    console.log(school);
    setUserInfo({ ...userInfo, school });
  };

  const changeQQ = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qq = e.target.value;
    setUserInfo({ ...userInfo, qq });
  };

  const showEmailModal = () => {
    setIsEmailModalOpen(true);
  };

  const changeEmail = () => {
    const req = {
      email: newEmail,
      verify_code: verifyCode,
    };
    void post('/auth/email', req, true).then(
      (r: ChangeEmailResult) => {
        if (r.code === 0) {
          const email = newEmail;
          setUserInfo({ ...userInfo, email });
          void (r.data.flag && message.success('邮箱绑定成功！'));
          setNewEmail('');
          setVerifyCode('');
        } else {
          void message.error('邮箱绑定失败，请重试！');
          setNewEmail('');
          setVerifyCode('');
        }
      },
      (e) => {
        console.log(e);
        void message.error('邮箱绑定失败，请重试！');
        setNewEmail('');
        setVerifyCode('');
      },
    );
    setIsEmailModalOpen(false);
  };

  const cancelEmailModal = () => {
    setIsEmailModalOpen(false);
    setNewEmail('');
    setVerifyCode('');
  };

  const sendVerificationCode = () => {
    const req = {
      email: newEmail,
      type: 'set_email',
    };

    post('/auth/send-verification-code', req, false).then(
      (r: SendEmailResult) => {
        const { flag } = r.data;
        if (flag) {
          void message.success('验证码已发送！');
          // setIsSend(true);
        }
      },
      (e) => {
        console.log(e);
        void message.error('获取验证码失败，请重试');
      },
    );
  };

  const submit = () => {
    const req = {
      avatar: userInfo.avatar,
      name: userInfo.name,
      nickname: userInfo.nickname,
      school: userInfo.school,
      qq: userInfo.qq,
    };

    void post('/users/', req, true).then((r) => {
      console.log(r);
      changeEditState();
    });
  };

  return (
    <>
      <div className="detail-info-box-edit">
        <div className="name-box">
          <div className="box-title">姓名:</div>
          <Input
            className="box-content"
            onChange={(e) => changeName(e)}
            value={userInfo.name}
            placeholder="请补充姓名"
          />
        </div>
        <div className="nickName-box">
          <div className="box-title">昵称:</div>
          <Input
            className="box-content"
            onChange={(e) => changeNickname(e)}
            value={userInfo.nickname}
            placeholder="请补充昵称"
          />
        </div>
        <div className="college-box">
          <div className="box-title">学院:</div>
          <Select
            className="box-content"
            defaultValue={'计算机学院'}
            value={userInfo.school}
            options={schoolData}
            onChange={changeSchool}
          />
        </div>
        <div className="account-box">
          <div className="box-title">学号:</div>
          <div className="box-content">{userInfo.student_id || '未绑定'}</div>
          <div className="change-btn">修改</div>
        </div>
        <div className="email-box">
          <div className="box-title">邮箱:</div>
          <div className="box-content">{userInfo.email}</div>
          <div className="change-btn" onClick={showEmailModal}>
            修改
          </div>
        </div>
        <div className="qq-box">
          <div className="box-title">QQ:</div>
          <Input
            className="box-content"
            onChange={(e) => changeQQ(e)}
            value={userInfo.qq}
            placeholder="请补充QQ"
          />
        </div>
        <div className="change-info-btn" onClick={submit}>
          确认修改
        </div>
      </div>
      <Modal
        className="email-modal"
        open={isEmailModalOpen}
        onOk={changeEmail}
        onCancel={cancelEmailModal}
        okText="确认"
        cancelText="取消"
      >
        <div className="email-box">
          <div className="box-label">新邮箱:</div>
          <Input
            className="input-field"
            onChange={(e) => setNewEmail(e.target.value)}
            value={newEmail}
            type="email"
            placeholder="请输入邮箱"
          />
        </div>
        <div className="verifyCode-box">
          <div className="box-label">验证码:</div>
          <Input
            className="input-field"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
          />
          <div className="get-verifyCode-btn" onClick={sendVerificationCode}>
            获取验证码
          </div>
        </div>
      </Modal>
    </>
  );
};

const HomePage: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [qiniuToken, setQiniuToken] = useState('');

  const [userInfo, setUserInfo] = useState<UserInfo>({
    avatar: '',
    name: '',
    nickname: '',
    school: '',
    email: '',
    group: '',
    student_id: '',
    qq: '',
  });

  useEffect(() => {
    void get('/users/my-info', true).then(
      (r: GetUserInfoResult) => {
        const { data } = r;
        setUserInfo(data);
      },
      (e) => {
        console.log(e);
        void message.error('获取个人信息失败，请重试');
      },
    );

    void get('/auth/get-qntoken', true).then((r: GetQiniuTokenResult) => {
      const { QiniuToken } = r.data;
      setQiniuToken(QiniuToken);
    });
  }, []);

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    const file = files[0];
    const key = file.name + nanoid(10);
    let avatar = URL.createObjectURL(file);
    setUserInfo({ ...userInfo, avatar });
    const putExtra = {};
    const config = {
      useCdnDomain: true,
      region: qiniu.region.z2,
    };
    const observable = qiniu.upload(files[0], key, qiniuToken, putExtra, config);

    const observer = {
      error(err: unknown) {
        // ...
        console.log(err);
        void message.error('更改头像失败，请重试');
      },
      complete(res: { hash: string; key: string }) {
        console.log(res);
        avatar = 'http://ossfresh-test.muxixyz.com/' + res.key;
        setUserInfo({ ...userInfo, avatar });
        const req = {
          avatar: avatar,
          name: userInfo.name,
          nickname: userInfo.nickname,
          school: userInfo.school,
          qq: userInfo.qq,
        };
        void post('/users/', req, true).then((r) => {
          console.log(r);
          void message.success('更改成功！');
        });
        /*  const avatar_url = "http://ossfresh-test.muxixyz.com/" + res.key
         */
        /*  setmsg({...msg,avatar}) */
        /*  console.log(res) */
      },
    };

    observable.subscribe(observer);
  };

  const changeEditState = () => {
    setIsEdit((isEdit) => !isEdit);
  };

  return (
    <div className="homePage-wrap">
      <div className="homePage-header">个人主页</div>
      <div className="person-info-box">
        <div className="avatar-box">
          <div className="avatar">
            <img src={userInfo.avatar} alt="" />
            <label htmlFor="upload-btn" className="avatar-label"></label>
          </div>
          <div className="change-avatar-box">
            <label htmlFor="upload-btn" className="change-avatar-btn">
              更换头像
            </label>
            <input onChange={changeAvatar} type="file" id="upload-btn" accept="image/*" />
          </div>
        </div>
        {isEdit ? (
          <EditInfo changeEditState={changeEditState} />
        ) : (
          <ShowInfo changeEditState={changeEditState} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
