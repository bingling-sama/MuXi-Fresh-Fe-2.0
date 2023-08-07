import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeworkAdminMode: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* <div className="comp">{DynamicComp}</div> */}
      <div style={{ width: '80vw', height: '80vh', marginLeft: '20px' }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default HomeworkAdminMode;
