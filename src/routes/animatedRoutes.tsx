import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomeWork from '../pages/homework';
import HomeworkAdminMode from '../pages/homework/adminMode';
import HomeworkUserMode from '../pages/homework/userMode';
import HomeworkUserSubmit from '../pages/homework/userMode/submit';
import HomeworkVisitorMode from '../pages/homework/visitorMode';
import HomeworkJudge from '../pages/homework/adminMode/judge';
import HomeworkNew from '../pages/homework/adminMode/new';
import HomeworkEdit from '../pages/homework/adminMode/edit';
import HomeworkBrowse from '../pages/homework/adminMode/browse';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeWork></HomeWork>}></Route>
        {/* 作业 */}
        <Route path="/homework" element={<HomeWork></HomeWork>}>
          <Route path="" element={<HomeworkVisitorMode></HomeworkVisitorMode>}></Route>
          {/* 管理员 */}
          <Route path="admin" element={<HomeworkAdminMode></HomeworkAdminMode>}>
            <Route path="new" element={<HomeworkNew></HomeworkNew>}></Route>
            <Route path="edit" element={<HomeworkEdit></HomeworkEdit>}></Route>
            <Route path="judge" element={<HomeworkJudge></HomeworkJudge>}>
              <Route path=":id" element={<HomeworkJudge></HomeworkJudge>}></Route>
            </Route>
            <Route path="browse" element={<HomeworkBrowse></HomeworkBrowse>}></Route>
          </Route>

          {/* 用户 */}
          <Route path="user" element={<HomeworkUserMode></HomeworkUserMode>}>
            <Route
              path="submit"
              element={<HomeworkUserSubmit></HomeworkUserSubmit>}
            ></Route>
          </Route>
          <Route
            path="visitor"
            element={<HomeworkVisitorMode></HomeworkVisitorMode>}
          ></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
