import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeWork from './pages/homework/pages';
import HomeworkAdminMode from './pages/homework/pages/adminMode';
import HomeworkUserMode from './pages/homework/pages/userMode';
import HomeworkUserSubmit from './pages/homework/pages/userMode/submit';
import HomeworkVisitorMode from './pages/homework/pages/visitorMode';
import HomeworkJudge from './pages/homework/pages/adminMode/judge';
import HomeworkNew from './pages/homework/pages/adminMode/new';
import HomeworkEdit from './pages/homework/pages/adminMode/edit';
import HomeworkBrowse from './pages/homework/pages/adminMode/browse';

import HomeworkUserSubmitMobile from './pages/homework/pages/userMode/MobileSubmit';
const Router = () => {
  localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1MzYxNzksImlhdCI6MTY5MjE3NjE3OSwiand0VXNlcklkIjoiNjRjNzE3MWVjMDBkYjE4ODdhZjM4YzgwIn0.Hm_8ZPMIlYcceOmUsvy4ox7GTGLAQmUdiJuKmM0VLhU',
  );
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
