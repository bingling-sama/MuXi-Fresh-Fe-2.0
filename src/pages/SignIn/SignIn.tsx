import React, { useEffect, useState } from 'react';
import { Input, message } from 'antd';
import './SignIn.less';
import signInImg from '../../assets/signInImg.png';
import logo1 from '../../assets/muxilogo2.png';
import logo2 from '../../assets/muxilogo.png';
import { get, post } from '../../fetch';
import { CodeImg, VerifyResult } from './Captcha.ts';
import { useNavigate } from 'react-router-dom';
import { SignInResult } from './SignIn.ts';

const SignIn: React.FC = () => {
  const [codeImg, setCodeImg] = useState('');
  const [imgId, setImgId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getCodeImg();
  }, []);

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

  const signIn = () => {
    const verifyReq = {
      image_id: imgId,
      verify_code: verifyCode,
    };

    post('/auth/verify-captcha', verifyReq, false).then(
      (r: VerifyResult) => {
        const { code } = r;
        if (code === 0) {
          const signInReq = {
            user_name: email,
            password: password,
          };

          post('/auth/login', signInReq, false).then(
            (r: SignInResult) => {
              console.log(r);
              localStorage.setItem('token', r.data.token);
              navigate('/');
            },
            (e) => {
              console.error(e);
            },
          );
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
    <div className="signIn-wrap">
      <div className="signIn-img-box">
        <img className="signIn-background" src={signInImg} alt="" />
        <div className="logo-box1">
          <img src={logo1} alt="" />
        </div>
        <div className="logo-box2">
          <img src={logo2} alt="" />
        </div>
      </div>
      <div className="signIn-form">
        <div className="email-box">
          <div className="box-label">邮箱:</div>
          <Input
            className="input-field"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="请输入邮箱"
          />
        </div>
        <div className="password-box">
          <div className="box-label">密码:</div>
          <Input.Password
            className="input-field"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="请输入密码"
          />
        </div>
        <div className="verification-code-box">
          <div className="box-label">验证码:</div>
          <Input
            className="input-field"
            onChange={(e) => {
              setVerifyCode(e.target.value);
            }}
            value={verifyCode}
          />
          <div className="code-img-box" onClick={getCodeImg}>
            <img className="code-img" src={codeImg} alt="" />
          </div>
        </div>
        <div className="btn-box">
          <div className="signIn-btn" onClick={signIn}>
            登录
          </div>
          <div
            className="signUp-btn"
            onClick={() => {
              navigate('/signUp');
            }}
          >
            注册
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
