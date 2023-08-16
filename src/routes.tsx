import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeWork from './pages/homework/pages';
import HomeworkAdminMode from './pages/homework/pages/AdminMode';
import HomeworkUserMode from './pages/homework/pages/UserMode';
import HomeworkUserSubmit from './pages/homework/pages/UserMode/Submit';
import HomeworkVisitorMode from './pages/homework/pages/VisitorMode';
import HomeworkJudge from './pages/homework/pages/AdminMode/Judge';
import HomeworkNew from './pages/homework/pages/AdminMode/New';
import HomeworkEdit from './pages/homework/pages/AdminMode/Edit';
import HomeworkBrowse from './pages/homework/pages/AdminMode/Browse';

import HomeworkUserSubmitMobile from './pages/homework/pages/UserMode/MobileSubmit';
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeWork></HomeWork>}></Route>
          {/* 作业 */}
          <Route path="/homework" element={<HomeWork></HomeWork>}>
            <Route path="" element={<HomeworkVisitorMode></HomeworkVisitorMode>}></Route>
            {/* 管理员 */}
            <Route path="admin" element={<HomeworkAdminMode></HomeworkAdminMode>}>
              <Route path="new" element={<HomeworkNew></HomeworkNew>}></Route>
              <Route path="edit" element={<HomeworkEdit></HomeworkEdit>}></Route>
              <Route path="judge" element={<HomeworkJudge></HomeworkJudge>}></Route>
              <Route path="browse" element={<HomeworkBrowse></HomeworkBrowse>}></Route>
            </Route>
            {/* 用户 */}
            <Route path="user" element={<HomeworkUserMode></HomeworkUserMode>}>
              <Route
                path="submit"
                element={<HomeworkUserSubmit></HomeworkUserSubmit>}
              ></Route>
            </Route>
            {/* 用户-mobile */}
            <Route
              path="userMobile/submit"
              element={<HomeworkUserSubmitMobile></HomeworkUserSubmitMobile>}
            ></Route>
            {/* 游客 */}
            <Route
              path="visitor"
              element={<HomeworkVisitorMode></HomeworkVisitorMode>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
