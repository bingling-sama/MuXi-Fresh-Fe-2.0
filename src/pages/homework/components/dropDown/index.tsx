import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, List, Popover } from 'antd';
import './index.less';
import { useNavigate } from 'react-router-dom';
import { taskListType } from '../../types';
import { get } from '../../../../fetch.ts';
import { DownOutlined } from '@ant-design/icons';

interface DropDownProps {
  onChoose?: (e: taskListType) => void;
  data: taskListType[];
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onSwitch?: (e: any, id: string) => void;
  type?: 'user' | 'admin';
  pure?: boolean;
}
export const DropDownPure: React.FC<DropDownProps> = (props) => {
  const { onChoose, data, onSwitch, type, pure } = props;
  const [selected, setSelected] = useState<taskListType>(data[0]);
  const [open, setOpen] = useState<boolean>(false);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    handleClick(data[0]);
  }, [data]);
  const navigate = useNavigate();
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const handleClick = (item: taskListType) => {
    setSelected(item);
    setOpen(false);
    onChoose && onChoose(item);
    if (item.id)
      /* eslint-disable @typescript-eslint/no-floating-promises */
      /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      get(`/task/assigned/${item.id}`).then((res) => {
        onSwitch && onSwitch(res.data, item.id);
      });
    else
      onSwitch &&
        onSwitch(
          {
            title_text: '暂无作业',
            content: '',
            urls: [],
          },
          '',
        );
  };
  const handleNewClick = () => {
    navigate('/app/homework/admin/new');
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpen(false);
    setSelected({ id: selected.id, text: e.target.value });
    onChoose && onChoose({ id: selected.id, text: e.target.value });
  };
  const renderText = (str: string) => {
    if (str?.length > 14) return str.slice(0, 14) + '...';
    return str;
  };
  const hoverContent = (
    <>
      <List
        id={
          type != 'user'
            ? pure
              ? 'drop-down-list-pure'
              : 'drop-down-list'
            : pure
            ? 'drop-down-list-user-pure'
            : 'drop-down-list-user'
        }
      >
        <div className={type != 'user' ? 'drop-list-wrap' : 'drop-list-wrap user'}>
          {data.map((item) => {
            return (
              <List.Item
                key={item.id}
                className="drop-item-wrap"
                onClick={() => handleClick(item)}
              >
                <div className="drop-down-list-item">
                  {renderText(item.text as string)}
                </div>
              </List.Item>
            );
          })}
        </div>
        {type != 'user' && (
          <Button className="new-task" onClick={handleNewClick}>
            新建作业
          </Button>
        )}
      </List>
    </>
  );
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F79B2E',
        },
      }}
    >
      <Popover
        open={open}
        content={hoverContent}
        trigger={pure ? 'click' : 'hover'}
        className="popover"
        placement="bottom"
        onOpenChange={handleOpenChange}
      >
        {type === 'user' ? (
          <Button id={pure ? 'button-pure' : 'button'} className="disabled">
            {renderText(selected?.text as string)}
            <div className="arrow">
              <DownOutlined />
            </div>
          </Button>
        ) : (
          <Input
            className={pure ? 'drop-input-pure' : 'drop-input'}
            placeholder={renderText(selected?.text as string)}
            onChange={handleChange}
            value={selected.text as string}
            allowClear
          ></Input>
        )}
      </Popover>
    </ConfigProvider>
  );
};

const DropDown: React.FC<DropDownProps> = (props) => {
  return (
    <>
      <div className="popover-wrap">
        <div className="input-label">标题</div>
        <DropDownPure {...props}></DropDownPure>
      </div>
    </>
  );
};
export default DropDown;
