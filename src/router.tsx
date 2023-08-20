import { createBrowserRouter } from 'react-router-dom';
import Verify from './components/Verify/Verify.tsx';
import { isDesktop } from 'react-device-detect';
import HomeWork from './pages/homework/pages';
import HomeworkUserSubmitMobile from './pages/homework/pages/userMode/MobileSubmit';
import HomeworkUserMode from './pages/homework/pages/userMode';

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
