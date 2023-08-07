import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeworkUserMode: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Outlet></Outlet>
    </div>
  );
};

export default HomeworkUserMode;
