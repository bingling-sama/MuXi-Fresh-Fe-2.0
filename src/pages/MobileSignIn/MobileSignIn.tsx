import React, { useEffect, useState } from 'react';
import join from '../../assets/join.png';
import logo from '../../assets/muxilogo.png';
import './MobileSignIn.less';
import { Input, Modal, message } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { get, post, postPwd } from '../../fetch';
import { CodeImg, SignInResult, VerifyResult } from './MobileSignIn';
import { useNavigate } from 'react-router-dom';
import { GetAuthSetPasswordResult } from '../PersonalPage/PersonalPage';
import { SendEmailResult } from '../SignUp/SignUp';
import { ChangeUserInfoResult } from '../HomePage/UserInfo';

const MobileSignIn: React.FC = () => {
  const [codeImg, setCodeImg] = useState('');
  const [imgId, setImgId] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [isSend, setIsSend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const navigate = useNavigate();

  useEffect(() => {
    getCodeImg();
  }, []);

  useEffect(() => {
    if (isSend) {
      const timer = setTimeout(() => {
        if (countdown > 0) {
          setCountdown((countdown) => countdown - 1);
        } else {
          setIsSend(false);
          setCountdown(60);
          clearTimeout(timer);
        }
      }, 1000);
    }
  }, [countdown, isSend]);

  const getCodeImg = () => {
    get('/auth/get-captcha', false).then(
      (r: CodeImg) => {
        const { image_base64, image_id } = r.data;
        setCodeImg(image_base64);
        setImgId(image_id);
      },
      (e) => {
        void message.error('获取验证码失败，请稍后重试');
        console.error(e);
      },
    );
  };

  const sendVerificationCode = (email: string, type: string) => {
    const testEmail =
      /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
    const isEmail = testEmail.test(email);

    if (!isEmail) {
      console.log(isEmail);
      void message.error('邮箱填写有误，请重试！');
      return;
    }

    const req = {
      email: email,
      type: type,
    };

    post('/auth/send-verification-code', req, false).then(
      (r: SendEmailResult) => {
        const { flag } = r.data;
        if (flag) {
          void message.success('验证码已发送！');
          setIsSend(true);
        } else {
          void message.success('验证码发送失败！');
        }
      },
      (e) => {
        console.error(e);
        void message.error('获取验证码失败，请重试');
      },
    );
  };

  const showPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const changePassword = () => {
    const testEmail =
      /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
    const isEmail = testEmail.test(email);

    if (!isEmail) {
      void message.error('邮箱填写有误，请重试！');
      return;
    }

    const req = {
      email: email,
      verify_code: verifyCode,
    };

    void post('/auth/auth-set-password', req, true).then(
      (r: GetAuthSetPasswordResult) => {
        if (r.code === 0) {
          const { auth_set_password_token } = r.data;
          const data = {
            password: newPassword,
          };
          void postPwd('/auth/set-password', data, auth_set_password_token).then(
            (r: ChangeUserInfoResult) => {
              if (r.code === 0) {
                void message.success('修改密码成功！');
                cancelPasswordModal();
              } else {
                void message.error('修改密码失败，请重试！');
                cancelPasswordModal();
              }
            },
            (e) => {
              console.error(e);
              void message.error('修改密码失败，请重试！');
              cancelPasswordModal();
            },
          );
        } else {
          void message.error('验证码错误，请重试！');
          cancelPasswordModal();
        }
      },
      (e) => {
        console.error(e);
        void message.error('修改密码失败，请重试！');
        cancelPasswordModal();
      },
    );
  };

  const cancelPasswordModal = () => {
    setIsPasswordModalOpen(false);
    setVerifyCode('');
    setEmail('');
    setNewPassword('');
    setIsSend(false);
    setCountdown(60);
  };

  const signIn = () => {
    const verifyReq = {
      image_id: imgId,
      verify_code: verifyCode,
    };

    post('/auth/verify-captcha', verifyReq, false).then(
      (r: VerifyResult) => {
        const { code } = r;
        if (code === 0) {
          const testEmail =
            /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
          const isEmail = testEmail.test(account);

          if (isEmail) {
            // 是email就邮箱登录
            const signInReq = {
              user_name: account,
              password: password,
            };
            post('/auth/login', signInReq, false).then(
              (r: SignInResult) => {
                if (r.code === 0) {
                  localStorage.setItem('token', r.data.token);
                  void message.success('登录成功！');
                  navigate('/');
                } else {
                  void message.error('登录失败，请重试！');
                  getCodeImg();
                }
              },
              (e) => {
                console.error(e);
                void message.error('登录失败，请重试！');
                getCodeImg();
              },
            );
          } else {
            // 不是email就学号登录
            const signInReq = {
              student_id: account,
              password: password,
            };
            post('/auth/ccnuLogin', signInReq, false).then(
              (r: SignInResult) => {
                if (r.code === 0) {
                  localStorage.setItem('token', r.data.token);
                  void message.success('登录成功！');
                  navigate('/');
                } else {
                  void message.error('该学号未绑定账号，请重试！');
                  getCodeImg();
                }
              },
              (e) => {
                console.error(e);
                void message.error('登录失败，请重试！');
                getCodeImg();
              },
            );
          }
        } else {
          void message.error('验证码错误，请重试');
          getCodeImg();
        }
      },
      (e) => {
        void message.error('验证码错误，请重试');
        getCodeImg();
        console.error(e);
      },
    );
  };

  return (
    <>
      <div className="mobileSignIn-wrap">
        <div className="header-box">
          <img src={join} alt="" />
        </div>
        <div className="form-box">
          <div className="form-title-box">
            <div className="logo-box">
              <img src={logo} alt="" />
            </div>
            <div className="team-name-box">木犀团队</div>
          </div>
          <div className="account-box">
            <Input
              className="input-field"
              prefix={<SmileOutlined />}
              onChange={(e) => {
                setAccount(e.target.value);
              }}
              value={account}
              placeholder="请输入邮箱/学号"
            />
          </div>
          <div className="password-box">
            <Input.Password
              className="input-field"
              prefix={<FrownOutlined />}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              placeholder="请输入密码"
            />
          </div>
          <div className="verification-code-box">
            <Input
              className="input-field"
              onChange={(e) => {
                setVerifyCode(e.target.value);
              }}
              value={verifyCode}
              placeholder="验证码"
            />
            <div className="code-img-box" onClick={getCodeImg}>
              <img className="code-img" src={codeImg} alt="" />
            </div>
          </div>
          <div className="forget-password-box">
            <span className="box-content" onClick={showPasswordModal}>
              忘记密码？
            </span>
          </div>
          <div className="btn-box">
            <div className="signIn-btn" onClick={signIn}>
              登录
            </div>
            <div className="signUp-btn" onClick={() => navigate('/register')}>
              注册
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="mobile-forget-password-modal"
        open={isPasswordModalOpen}
        onOk={changePassword}
        onCancel={cancelPasswordModal}
        okText="确认"
        cancelText="取消"
        centered
      >
        <div className="email-box">
          <div className="box-label">邮箱:</div>
          <Input
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="请输入邮箱"
          />
        </div>
        <div className="password-box">
          <div className="box-label">新密码:</div>
          <Input.Password
            className="input-field"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeholder="请输入新密码"
          />
        </div>
        <div className="verifyCode-box">
          <div className="box-label">验证码:</div>
          <Input
            className="input-field"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
          />
          {!isSend ? (
            <div
              className="get-verifyCode-btn"
              onClick={() => sendVerificationCode(email, 'set_password')}
            >
              获取验证码
            </div>
          ) : (
            <div className="countdown-box">{`${countdown}s`}</div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default MobileSignIn;
