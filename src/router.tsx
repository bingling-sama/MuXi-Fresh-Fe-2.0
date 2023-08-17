import { createBrowserRouter } from 'react-router-dom';
import AuthorityManage from './pages/AuthorityManage/AuthorityManage.tsx';
import Review from './pages/Review/Review.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import SignUp from './pages/SignUp/SignUp.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import Progress from './pages/Progress/Progress.tsx';
import Verify from './components/Verify/Verify.tsx';
import HomeWork from './pages/homework/pages';
import HomeworkVisitorMode from './pages/homework/pages/visitorMode';
import HomeworkAdminMode from './pages/homework/pages/adminMode';
import HomeworkNew from './pages/homework/pages/adminMode/new';
import HomeworkEdit from './pages/homework/pages/adminMode/edit';
import HomeworkJudge from './pages/homework/pages/adminMode/judge';
import HomeworkBrowse from './pages/homework/pages/adminMode/browse';
import HomeworkUserMode from './pages/homework/pages/userMode';
import HomeworkUserSubmit from './pages/homework/pages/userMode/submit';

const router = createBrowserRouter([
  { path: '/login', element: <SignIn /> },
  { path: '/signUp', element: <SignUp /> },
  {
    path: '/',
    element: <Verify />,
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/progress', element: <Progress /> },
      {
        // 作业
        path: '/homework',
        element: <HomeWork></HomeWork>,
        children: [
          // { path: '/', element: <HomeworkVisitorMode></HomeworkVisitorMode> },
          {
            // 管理员
            path: 'admin',
            element: <HomeworkAdminMode></HomeworkAdminMode>,
            children: [
              { path: 'new', element: <HomeworkNew></HomeworkNew> },
              {
                path: 'edit',
                element: <HomeworkEdit></HomeworkEdit>,
              },
              { path: 'judge', element: <HomeworkJudge></HomeworkJudge> },
              {
                path: 'browse',
                element: <HomeworkBrowse></HomeworkBrowse>,
              },
            ],
          },
          {
            // 用户
            path: 'user',
            element: <HomeworkUserMode></HomeworkUserMode>,
            children: [
              {
                path: 'submit',
                element: <HomeworkUserSubmit></HomeworkUserSubmit>,
              },
            ],
          },
          {
            // 游客
            path: 'visitor',
            element: <HomeworkVisitorMode></HomeworkVisitorMode>,
          },
        ],
      },
      { path: '/review', element: <Review /> },
      {
        path: '/authority-manage',
        element: <AuthorityManage />,
      },
    ],
  },
]);

export default router;
