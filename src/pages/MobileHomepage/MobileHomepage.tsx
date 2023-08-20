import {
  Avatar,
  ConfigProvider,
  Dropdown,
  Image,
  Layout,
  MenuProps,
  message,
} from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { get } from '../../fetch.ts';
import { PersonalInformation } from '../../type/PersonalInformation.ts';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import defaultAvatar from '../../assets/defaultAvatar.png';
import background from '../../assets/homepage-background.png';
import progressQuery from '../../assets/progress-query.png';
import submit from '../../assets/submit.png';
import submitTest from '../../assets/submit-test.png';
import './MobileHomepage.less';

const MobileHomepage: React.FC = () => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [name, setName] = useState('');

  useEffect(() => {
    get('/users/my-info').then(
      (r: PersonalInformation) => {
        const { avatar, name } = r.data;
        setAvatar(avatar);
        setName(name);
      },
      (e) => {
        void message.error('获取个人信息失败，请稍后重试');
        console.error(e);
      },
    );
  }, []);

  const navigate = useNavigate();

  const navigationClick = (target: string) => {
    navigate(target);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    void message.success('退出登录成功');
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div
          onClick={() => {
            navigationClick('/mobile-home');
          }}
        >
          <UserOutlined />
          &nbsp; 个人主页
        </div>
      ),
      key: '/home',
    },
    {
      label: (
        <div onClick={logOut}>
          <PoweroffOutlined />
          &nbsp; 退出登录
        </div>
      ),
      key: 'logout',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#FFC93F',
        },
        components: {
          Layout: {
            colorBgBody: 'transparent',
          },
        },
      }}
    >
      <Layout className={'mobileLayout'}>
        <Header className={'mobileLayoutHeader'}>
          <div className={'mobileLayoutHeaderBox'}>
            <Avatar src={avatar || defaultAvatar} size="large" alt="avatar" />
            <div>{name}</div>
          </div>
          <Dropdown menu={{ items }} placement={'bottom'}>
            <MenuOutlined />
          </Dropdown>
        </Header>
        <Content className={'mobileLayoutContent'}>
          <div className={'mobileLayoutContentImg'}>
            <Image src={background} width={'80vw'} preview={false}></Image>
          </div>
          <div className={'mobileLayoutContentBox'}>
            <div
              className={'mobileLayoutContentBoxs'}
              onClick={() => {
                navigationClick('/form');
              }}
            >
              <Image src={progressQuery} width={'20vw'} preview={false}></Image>
              报名表
            </div>
            <div
              className={'mobileLayoutContentBoxs'}
              onClick={() => {
                navigationClick('/');
              }}
            >
              <Image src={progressQuery} width={'20vw'} preview={false}></Image>
              进度查询
            </div>
            <div
              className={'mobileLayoutContentBoxs'}
              onClick={() => {
                navigationClick('/homework/user/submit');
              }}
            >
              <Image src={submit} width={'20vw'} preview={false}></Image>
              提交作业
            </div>
            <div
              className={'mobileLayoutContentBoxs'}
              onClick={() => {
                navigationClick('/');
              }}
            >
              <Image src={submitTest} width={'20vw'} preview={false}></Image>
              入职测验
            </div>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default MobileHomepage;
