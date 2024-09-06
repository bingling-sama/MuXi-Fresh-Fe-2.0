import './SelectGroup.less';
import React, { useCallback, useMemo, useState } from 'react';
import { Group, AdminFilter } from '../../../AdminFilter';
import { ConfigProvider, Menu } from 'antd';

type ReviewGroupSelectProps = {
  adminFilter: AdminFilter;
  changeGroup(group: Group): void;
};

const SelectGroup: React.FC<ReviewGroupSelectProps> = ({ adminFilter, changeGroup }) => {
  const groups = useMemo(
    () => [Group.All, Group.Product, Group.Frontend, Group.Backend, Group.Design],
    [],
  );
  const chineseGroups: { [key in Group]: string } = {
    // Android: '安卓组',
    All: '全部',
    Backend: '后端组',
    Design: '设计组',
    Frontend: '前端组',
    Product: '产品组',
  };

  const [selectedGroup, setSelectedGroup] = useState<Group>(adminFilter.group);

  const handleChange = useCallback(
    (group: Group) => {
      setSelectedGroup(group);
      changeGroup(group);
    },
    [changeGroup],
  );

  return (
    <div className={'reviewGroupSelect'}>
      <div className={'reviewGroupSelectTitle'}>选择组别</div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHeight: 76,
            },
          },
        }}
      >
        <Menu
          // mode="inline"
          selectedKeys={[selectedGroup]}
          onClick={(e) => handleChange(e.key as Group)}
          items={groups.map((group) => ({
            key: group,
            title: chineseGroups[group],
            label: <div className={'reviewGroups'}>{chineseGroups[group]}</div>,
          }))}
          style={{ height: '400px', textAlign: 'center' }}
        />
      </ConfigProvider>
    </div>
  );
};

export default SelectGroup;
