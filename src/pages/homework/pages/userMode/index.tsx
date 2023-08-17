import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeworkUserMode: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Outlet></Outlet>
    </div>
  );
};

export default HomeworkUserMode;
