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
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const [isEmail, setIsEmail] = useState(true);

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

  const checkEmail = () => {
    const isEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-]{2,})+(.[a-zA-Z]{2,3})$/;
    setIsEmail(isEmail.test(account));
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
          if (isEmail) {
            // 是email就邮箱登录
            const signInReq = {
              user_name: account,
              password: password,
            };
            post('/auth/login', signInReq, false).then(
              (r: SignInResult) => {
                localStorage.setItem('token', r.data.token);
                void message.success('登录成功！');
                // 用已经声明好的navigate跳转到首页
              },
              (e) => {
                console.error(e);
                void message.error('登录失败，请重试！');
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
                  // 用已经声明好的navigate跳转到首页
                } else {
                  void message.error('该学号未绑定账号，请重试！');
                }
              },
              (e) => {
                console.error(e);
                void message.error('登录失败，请重试！');
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
          <div className="box-label">账号:</div>
          <Input
            className="input-field"
            onChange={(e) => {
              setAccount(e.target.value);
            }}
            value={account}
            onBlur={checkEmail}
            placeholder="请输入邮箱/学号"
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
