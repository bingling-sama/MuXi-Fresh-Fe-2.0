import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Layout.less';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/muxilogo.png';
import defaultAvatar from '../../assets/default_avatar.png';
import { get } from '../../fetch.ts';
import { PersonalInformation } from '../../type/PersonalInformation.ts';
import type { MenuProps } from 'antd';
import {
  Avatar,
  ConfigProvider,
  Dropdown,
  Layout as LayoutAntd,
  Menu,
  message,
} from 'antd';

const { Header, Content, Sider } = LayoutAntd;
const Layout: React.FC = () => {
  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    get('/users/my-info').then(
      (r: PersonalInformation) => {
        const { avatar } = r.data;
        setAvatar(avatar);
      },
      (e) => {
        console.error(e);
      },
    );
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

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
            navigationClick('/home');
          }}
        >
          个人主页
        </div>
      ),
      key: '/home',
    },
    {
      label: <div onClick={logOut}>退出登录</div>,
      key: 'logout',
    },
  ];

  return (
    <div className={'layout'}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100vw',
          backgroundColor: '#ffffff',
          justifyContent: 'space-between',
          paddingLeft: 0,
        }}
      >
        <div className={'layoutLogoBox'}>
          <div className="layoutLogo">
            <img src={logo} alt="logo" />
            <div>木犀官网</div>
          </div>
        </div>
        <Dropdown menu={{ items }} placement={'bottom'}>
          <Avatar src={avatar || defaultAvatar} size="large" alt="avatar" />
        </Dropdown>
      </Header>
      <Sider width={'10vw'}>
        <div className={'layoutSidebar'}>
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: '#ffb841',
              },
              components: {
                Menu: {
                  itemSelectedBg: '#ffaf24',
                  itemSelectedColor: '#fffacc',
                  itemColor: '#fffacc',
                  itemHeight: 75,
                },
              },
            }}
          >
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              onSelect={(e) => {
                navigationClick(e.key);
              }}
              style={{ minWidth: 0, flex: 'auto' }}
            >
              <Menu.Item key="/1" className={'layoutLink'}>
                报名表
              </Menu.Item>
              <Menu.Item key="/progress" className={'layoutLink'}>
                进度查询
              </Menu.Item>
              <Menu.SubMenu key="/3" className={'layoutLinkTestTitle'} title={'作业'}>
                <Menu.Item key="/4" className={'layoutLinkTest'}>
                  新作业
                </Menu.Item>
                <Menu.Item key="/5" className={'layoutLinkTest'}>
                  修改作业
                </Menu.Item>
                <Menu.Item key="/6" className={'layoutLinkTest'}>
                  查看作业
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="/review" className={'layoutLink'}>
                审阅
              </Menu.Item>
              <Menu.Item key="/authority-manage" className={'layoutLink'}>
                权限管理
              </Menu.Item>
              <Menu.Item key="/9" className={'layoutLink'}>
                入职测验
              </Menu.Item>
            </Menu>
          </ConfigProvider>
        </div>
      </Sider>
      <Content>
        <div className={'layoutBox'}>
          <div className={'layoutContent'}>
            <Outlet></Outlet>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Layout;
