import React, { useEffect, useState } from 'react';
import { Input, message } from 'antd';
import './SignUp.less';
import logo from '../../assets/muxilogo.png';
import { post } from '../../fetch';
import { SendEmailResult, SignUpResult } from './SignUp';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [VerifyCode, setVerifyCode] = useState('');

  const [isEmail, setIsEmail] = useState(true);
  const [isPasswordFormat, setIsPasswordFormat] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isSend, setIsSend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const navigate = useNavigate();

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

  const sendVerificationCode = () => {
    const req = {
      email: email,
      type: 'auth_register',
    };

    post('/auth/send-verification-code', req, false).then(
      (r: SendEmailResult) => {
        const { flag } = r.data;
        if (flag) {
          setIsSend(true);
        }
      },
      (e) => {
        console.log(e);
        void message.error('获取验证码失败，请重试');
      },
    );
  };

  const checkEmail = () => {
    const isEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-]{2,})+(.[a-zA-Z]{2,3})$/;
    setIsEmail(isEmail.test(email));
  };

  const checkPasswordFormat = () => {
    if (password.length < 6) {
      setIsPasswordFormat(false);
    } else {
      setIsPasswordFormat(true);
    }
  };

  const checkPasswordMatch = () => {
    if (password === checkPassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const submit = () => {
    if (!isEmail || !isPasswordFormat || !isPasswordMatch) {
      void message.error('注册信息填写有误，请重试！');
      return;
    }

    const req = {
      email: email,
      password: password,
      verify_code: VerifyCode,
    };

    post('/auth/register', req, false).then(
      (r: SignUpResult) => {
        const { code } = r;
        if (code === 0) {
          void message.success('注册成功！');
          localStorage.setItem('token', r.data.token);
          void post('/schedule/create', true);
        } else if (code === -1) {
          void message.error('出错了');
        }
      },
      (e) => {
        console.log(e);
        void message.error('注册失败，请重试');
      },
    );
  };

  return (
    <div className="signUp-wrap">
      <div className="signUp-wrap-header">
        <img src={logo} alt="" />
        <div className="header-title">MUXI</div>
      </div>
      <div className="signUp-form">
        <div className={`email-box ${!isEmail ? 'email-tooltip' : ''}`}>
          <div className="box-label">邮箱:</div>
          <Input
            className="input-field"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={checkEmail}
            value={email}
            status={!isEmail ? 'error' : ''}
            placeholder="请输入邮箱"
          />
        </div>
        <div className={`password-box ${!isPasswordFormat ? 'password-tooltip' : ''}`}>
          <div className="box-label">密码:</div>
          <Input.Password
            className="input-field"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={checkPasswordFormat}
            value={password}
            status={!isPasswordFormat ? 'error' : ''}
            placeholder="请输入密码"
          />
        </div>
        <div
          className={`check-password-box ${
            !isPasswordMatch ? 'check-password-tooltip' : ''
          }`}
        >
          <div className="box-label">确认密码:</div>
          <Input.Password
            className="input-field"
            onChange={(e) => {
              setCheckPassword(e.target.value);
            }}
            onBlur={checkPasswordMatch}
            value={checkPassword}
            status={!isPasswordMatch ? 'error' : ''}
            placeholder="请确认密码"
          />
        </div>
        <div className="verifyCode-box">
          <div className="box-label">验证码:</div>
          <Input
            className="input-field"
            onChange={(e) => {
              setVerifyCode(e.target.value);
            }}
            value={VerifyCode}
          />
          {!isSend ? (
            <div className="get-verifyCode-btn" onClick={sendVerificationCode}>
              获取验证码
            </div>
          ) : (
            <div className="countdown-box">{`${countdown}s`}</div>
          )}
        </div>
        <div className="btn-box">
          <div
            className="signIn-btn"
            onClick={() => {
              navigate('/login');
            }}
          >
            登录
          </div>
          <div className="signUp-btn" onClick={submit}>
            注册
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
