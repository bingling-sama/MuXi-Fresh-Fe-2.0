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
import { UserIdentity, UserIsForm } from '../Verify/UserIdentity.ts';

const { Header, Content, Sider } = LayoutAntd;

type LayoutProps = {
  identity: UserIdentity;
  isForm: UserIsForm;
};

const Layout: React.FC<LayoutProps> = ({ identity, isForm }) => {
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
            navigationClick('/app/home');
          }}
        >
          个人主页
        </div>
      ),
      key: '/app/home',
    },
    {
      label: <div onClick={logOut}>退出登录</div>,
      key: 'logout',
    },
  ];

  const menus: MenuProps['items'] = [
    {
      key: '/app/form',
      title: '报名表',
      label: <div className={'layoutLink'}>报名表</div>,
    },
    {
      key: '/app/progress',
      title: '进度查询',
      label: <div className={'layoutLink'}>进度查询</div>,
    },
    isForm === '已交表'
      ? {
          key: '/app/homework',
          title: '作业',
          label: <div className={'layoutLinkTestTitle'}>作业</div>,
          children:
            identity === 'super_admin' || identity === 'admin'
              ? [
                  {
                    key: '/app/homework/admin/new',
                    title: '新作业',
                    label: (
                      <div className={'layoutLinkTest'} style={{ fontSize: '1vw' }}>
                        新作业
                      </div>
                    ),
                  },
                  {
                    key: '/app/homework/admin/edit',
                    title: '修改作业',
                    label: (
                      <div className={'layoutLinkTest'} style={{ fontSize: '1vw' }}>
                        修改作业
                      </div>
                    ),
                  },
                  {
                    key: '/app/homework/admin/browse',
                    title: '查看作业',
                    label: (
                      <div className={'layoutLinkTest'} style={{ fontSize: '1vw' }}>
                        查看作业
                      </div>
                    ),
                  },
                ]
              : [
                  {
                    key: '/app/homework/user/submit',
                    title: '提交作业',
                    label: (
                      <div className={'layoutLinkTest'} style={{ fontSize: '1vw' }}>
                        提交作业
                      </div>
                    ),
                  },
                ],
        }
      : {
          key: '/app/homework/visitor',
          title: '作业',
          label: <div className={'layoutLink'}>作业</div>,
        },
    identity === 'super_admin' || identity === 'admin'
      ? {
          key: '/app/review',
          title: '审阅',
          label: <div className={'layoutLink'}>审阅</div>,
        }
      : null,
    identity === 'super_admin' || identity === 'admin'
      ? {
          key: '/app/authority-manage',
          title: '权限管理',
          label: <div className={'layoutLink'}>权限管理</div>,
        }
      : null,
    identity === 'super_admin' || identity === 'admin'
      ? null
      : {
          key: '/app/test',
          title: '入职测验',
          label: <div className={'layoutLink'}>入职测验</div>,
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
              items={menus}
              onSelect={(e) => {
                navigationClick(e.key);
              }}
              style={{ minWidth: 0, flex: 'auto' }}
            />
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
