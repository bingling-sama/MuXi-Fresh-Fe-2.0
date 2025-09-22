import React, { HTMLAttributes } from 'react';

interface TitleProps {
  title?: string;
  className?: string;
  extra?: React.ReactNode;
  deadline?: string;
}
const Title: React.FC<TitleProps & Omit<HTMLAttributes<HTMLDivElement>, 'className'>> = (
  props,
) => {
  const { title, className, extra, deadline, ...restProps } = props;
  const Legnth = title?.length as number;
  return (
    <>
      <div className={`upload-title ${className as string}`} {...restProps}>
        <div className="upload-title-text" style={{ width: `${Legnth * 1.4}vw` }}>
          {title}
          {extra}
        </div>

        <div className="upload-title-deco" style={{ width: `${Legnth * 1.4}vw` }}></div>
        {deadline && <div className="deadline">作业截止时间： {deadline}</div>}
      </div>
    </>
  );
};

export default Title;
