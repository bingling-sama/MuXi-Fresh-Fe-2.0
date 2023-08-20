import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeworkAdminMode: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Outlet></Outlet>
    </div>
  );
};

export default HomeworkAdminMode;
