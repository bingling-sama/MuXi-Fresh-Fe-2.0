import { createBrowserRouter } from 'react-router-dom';
import AuthorityManage from './pages/AuthorityManage/AuthorityManage.tsx';
import Review from './pages/Review/Review.tsx';
import Verify from './components/Verify/Verify.tsx';
import { isDesktop } from 'react-device-detect';

export const router = createBrowserRouter(
  isDesktop
    ? [
        {
          path: '/',
          element: <Verify />,
          children: [
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
        {
          path: '/',
          element: <Verify />,
        },
      ],
);
