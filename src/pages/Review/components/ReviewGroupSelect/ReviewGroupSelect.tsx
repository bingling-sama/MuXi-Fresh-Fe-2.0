import './ReviewGroupSelect.less';
import React, { useCallback, useMemo, useState } from 'react';
import { Group, ReviewFilter } from '../../ReviewFitler.ts';
import { Menu } from 'antd';

type ReviewGroupSelectProps = {
  reviewFilter: ReviewFilter;
  changeGroup(group: Group): void;
};

const ReviewGroupSelect: React.FC<ReviewGroupSelectProps> = ({
  reviewFilter,
  changeGroup,
}) => {
  const groups = useMemo(
    () => [Group.Product, Group.Frontend, Group.Backend, Group.Android, Group.Design],
    [],
  );
  const chineseGroups: { [key in Group]: string } = {
    Product: '产品组',
    Design: '设计组',
    Frontend: '前端组',
    Backend: '后端组',
    Android: '安卓组',
  };

  const [selectedGroup, setSelectedGroup] = useState<Group>(reviewFilter.group);

  const handleChange = useCallback(
    (group: Group) => {
      setSelectedGroup(group);
      changeGroup(group);
    },
    [changeGroup],
  );

  return (
    <div className={'reviewGroupSelect'}>
      <div className={'reviewGroupSelectTitle'}>成员分组</div>
      <Menu
        mode="inline"
        selectedKeys={[selectedGroup]}
        onClick={(e) => handleChange(e.key as Group)}
      >
        {groups.map((group) => (
          <Menu.Item key={group} className={`reviewGroups`}>
            {chineseGroups[group]}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default ReviewGroupSelect;
