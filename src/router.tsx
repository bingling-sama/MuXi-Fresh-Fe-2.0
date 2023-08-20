import { createBrowserRouter } from 'react-router-dom';
import Verify from './components/Verify/Verify.tsx';
import { isDesktop } from 'react-device-detect';
import HomeWork from './pages/homework/pages';
import HomeworkUserSubmitMobile from './pages/homework/pages/userMode/MobileSubmit';
import HomeworkUserMode from './pages/homework/pages/userMode';
import FormForMobile from './pages/formM';

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
        {
          path: '/',
          element: <Verify />,
        },
        { path: '/form', element: <FormForMobile /> }, // 报名表
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
