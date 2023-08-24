import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthorityManage from './pages/AuthorityManage/AuthorityManage.tsx';
import Review from './pages/Review/Review.tsx';
import Verify from './components/Verify/Verify.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import SignUp from './pages/SignUp/SignUp.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import Progress from './pages/Progress/Progress.tsx';
import HomeWork from './pages/homework/pages';
import HomeworkVisitorMode from './pages/homework/pages/visitorMode';
import HomeworkAdminMode from './pages/homework/pages/adminMode';
import HomeworkNew from './pages/homework/pages/adminMode/new';
import HomeworkEdit from './pages/homework/pages/adminMode/edit';
import HomeworkJudge from './pages/homework/pages/adminMode/judge';
import HomeworkBrowse from './pages/homework/pages/adminMode/browse';
import HomeworkUserMode from './pages/homework/pages/userMode';
import HomeworkUserSubmit from './pages/homework/pages/userMode/submit';
import FormForWeb from './pages/formW';
import { isDesktop } from 'react-device-detect';
import HomeworkUserSubmitMobile from './pages/homework/pages/userMode/MobileSubmit';
import FormForMobile from './pages/formM';
import MobileSignIn from './pages/MobileSignIn/MobileSignIn.tsx';
import MobileSignUp from './pages/MobileSignUp/MobileSignUp.tsx';
import MobileProgress from './pages/MobileProgress/MobileProgress.tsx';
import PersonalPage from './pages/PersonalPage/PersonalPage.tsx';

export const router = createBrowserRouter(
  isDesktop
    ? [
        { path: '/login', element: <SignIn /> },
        { path: '/register', element: <SignUp /> },
        {
          path: '/',
          element: <Verify />,
          children: [
            { path: '', element: <Navigate to="/form" /> },
            { path: '/home', element: <HomePage /> }, // 个人主页
            { path: '/form', element: <FormForWeb /> }, // 报名表
            { path: '/progress', element: <Progress /> }, // 进度查询
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
            { path: '/review', element: <Review /> }, // 审阅
            {
              // 权限管理
              path: '/authority-manage',
              element: <AuthorityManage />,
            },
          ],
        },
      ]
    : [
        { path: '/login', element: <MobileSignIn /> },
        { path: '/register', element: <MobileSignUp /> },
        {
          path: '/',
          element: <Verify />,
        },
        { path: '/home', element: <PersonalPage /> }, // 个人主页
        { path: '/form', element: <FormForMobile /> }, // 报名表
        { path: '/progress', element: <MobileProgress /> }, // 进度查询
        {
          // 作业
          path: '/homework',
          element: <HomeWork></HomeWork>,
          children: [
            {
              // 用户
              path: 'user',
              element: <HomeworkUserMode></HomeworkUserMode>,
              children: [
                {
                  path: 'submit',
                  element: <HomeworkUserSubmitMobile></HomeworkUserSubmitMobile>,
                },
              ],
            },
          ],
        },
      ],
);
