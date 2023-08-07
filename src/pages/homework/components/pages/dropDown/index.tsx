import React, { useState, ChangeEvent, useEffect } from 'react';
import { List, Popover, Button, ConfigProvider, Input } from 'antd';
import './index.less';
import { useNavigate } from 'react-router-dom';
import { taskListType } from '../../../types';
import { get } from '../../../../../services/fetch';

interface DropDownProps {
  onChoose?: (e: taskListType) => void;
  data: taskListType[];
  onSwitch?: (e: any, id: string) => void;
  type?: 'user' | 'admin';
}

const DropDown: React.FC<DropDownProps> = (props) => {
  const { onChoose, data, onSwitch, type } = props;
  const [selected, setSelected] = useState<taskListType>(data[0]);
  const [open, setOpen] = useState<boolean>(false);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    handleClick(data[0]);
  }, []);
  const navigate = useNavigate();
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const handleClick = (item: taskListType) => {
    setSelected(item);
    setOpen(false);
    onChoose && onChoose(item);
    if (item.id)
      get(`/task/assigned/${item.id}`).then((res) => {
        onSwitch && onSwitch(res.data, item.id);
      });
  };
  const handleNewClick = () => {
    navigate('/homework/admin/new');
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpen(false);
    setSelected({ id: selected.id, text: e.target.value });
    onChoose && onChoose({ id: selected.id, text: e.target.value });
  };
  const renderText = (str: string) => {
    if (str?.length > 14) return (str = str.slice(0, 14) + '...');
    return str;
  };
  const hoverContent = (
    <>
      <List id={type != 'user' ? 'drop-down-list' : 'drop-down-list-user'}>
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
      <div className="popover-wrap">
        <div className="input-label">标题</div>
        <Popover
          open={open}
          content={hoverContent}
          className="popover"
          placement="bottom"
          onOpenChange={handleOpenChange}
        >
          {type === 'user' ? (
            <Button id="button" className="disabled">
              {renderText(selected?.text as string)}
            </Button>
          ) : (
            <Input
              className="drop-input"
              placeholder={renderText(selected?.text as string)}
              onChange={handleChange}
              value={selected.text as string}
              allowClear
            ></Input>
          )}
        </Popover>
      </div>
    </ConfigProvider>
  );
};

export default DropDown;
