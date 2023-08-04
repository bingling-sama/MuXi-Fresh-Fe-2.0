import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { items } from './menuConfig';
import { Outlet, useNavigate } from 'react-router-dom';

const HomeworkAdminMode: React.FC = () => {
  const [current, setCurrent] = useState<string>(items ? (items[0]?.key as string) : '');
  // const [DynamicComp, setDynamicComp] = useState<ReactElement | null>();
  // useEffect(() => {
  //   import(`./${current}/index.tsx`)
  //     .then((res) => setDynamicComp(res?.default as ReactElement))
  //     .catch((err) => console.log(err));
  // }, [current]);
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(`/homework/admin/${e.key}`);
  };
  return (
    <div style={{ display: 'flex' }}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="vertical"
        items={items}
        style={{ width: '232px' }}
      />
      {/* <div className="comp">{DynamicComp}</div> */}
      <div style={{ width: '80vw', height: '80vh', marginLeft: '20px' }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default HomeworkAdminMode;
