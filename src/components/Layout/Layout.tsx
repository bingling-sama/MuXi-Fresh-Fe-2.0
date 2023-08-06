import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.less';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/muxilogo.png';
import defaultAvatar from '../../assets/default_avatar.png';
import { get } from '../../fetch.ts';
import { PersonalInformation } from '../../type/PersonalInformation.ts';
import { ConfigProvider, Menu, Layout as LayoutAntd, Avatar, message } from 'antd';

const { Header, Content, Sider } = LayoutAntd;
const Layout: React.FC = () => {
  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    get('/users/').then(
      (r: PersonalInformation) => {
        const { avatar } = r.data;
        setAvatar(avatar);
      },
      (e) => {
        void message.error('获取个人信息失败,请稍后重试');
        console.error(e);
      },
    );
  }, []);

  const navigate = useNavigate();
  // 定义一个 state，用于存储当前选中的菜单项的 key 值
  const [selectedKey, setSelectedKey] = useState('1');

  const navigationClick = (target: string) => {
    setSelectedKey(target);
    navigate(target);
  };

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
        <Avatar src={avatar || defaultAvatar} size="large" alt="avatar" />
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
              selectedKeys={[selectedKey]}
              onSelect={(e) => {
                navigationClick(e.key);
              }}
              style={{ minWidth: 0, flex: 'auto' }}
            >
              <Menu.Item key="/1" className={'layoutLink'}>
                报名表
              </Menu.Item>
              <Menu.Item key="/2" className={'layoutLink'}>
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
