import React, { HTMLAttributes } from 'react';

interface TitleProps {
  title?: string;
  className?: string;
  extra?: React.ReactNode;
}
const Title: React.FC<TitleProps & Omit<HTMLAttributes<HTMLDivElement>, 'className'>> = (
  props,
) => {
  const { title, className, extra, ...restProps } = props;
  const Legnth = title?.length as number;
  return (
    <>
      <div className={`upload-title ${className as string}`} {...restProps}>
        <div className="upload-title-text" style={{ width: `${Legnth * 1.4}vw` }}>
          {title}
          {extra}
        </div>
        <div className="upload-title-deco" style={{ width: `${Legnth * 1.4}vw` }}></div>
      </div>
    </>
  );
};

export default Title;
