import { createBrowserRouter } from 'react-router-dom';
import Verify from './components/Verify/Verify.tsx';
import { isDesktop } from 'react-device-detect';
import HomeWork from './pages/homework/pages';
import HomeworkUserSubmitMobile from './pages/homework/pages/userMode/MobileSubmit';
import HomeworkUserMode from './pages/homework/pages/userMode';
import FormForMobile from './pages/formM';
import MobileSignIn from './pages/MobileSignIn/MobileSignIn.tsx';
import MobileSignUp from './pages/MobileSignUp/MobileSignUp.tsx';
import MobileProgress from './pages/MobileProgress/MobileProgress.tsx';
import PersonalPage from './pages/PersonalPage/PersonalPage.tsx';
import TestM from './pages/personalityTestM';

export const router = createBrowserRouter(
  isDesktop
    ? [
        {
          path: '/',
          element: <Verify />,
          children: [],
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
        { path: '/test', element: <TestM /> }, // 入职测验
      ],
);
