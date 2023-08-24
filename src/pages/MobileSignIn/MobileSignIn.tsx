import React, { useEffect, useState } from 'react';
import join from '../../assets/join.png';
import logo from '../../assets/muxilogo.png';
import './MobileSignIn.less';
import { Input, message } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { get, post } from '../../fetch';
import { CodeImg, SignInResult, VerifyResult } from './MobileSignIn';
import { useNavigate } from 'react-router-dom';

const MobileSignIn: React.FC = () => {
  const [codeImg, setCodeImg] = useState('');
  const [imgId, setImgId] = useState('');
  const [account, setAccount] = useState('');
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
                  // 用已经声明好的navigate跳转到首页
                } else {
                  void message.error('登录失败，请重试！');
                }
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
        <div className="btn-box">
          <div className="signIn-btn" onClick={signIn}>
            登录
          </div>
          <div className="signUp-btn" onClick={() => navigate('/signUp')}>
            注册
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSignIn;
