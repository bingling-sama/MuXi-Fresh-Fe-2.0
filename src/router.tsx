import { createBrowserRouter } from 'react-router-dom';
import AuthorityManage from './pages/AuthorityManage/AuthorityManage.tsx';
import Review from './pages/Review/Review.tsx';
import Verify from './components/Verify/Verify.tsx';
import { isDesktop } from 'react-device-detect';

const router = createBrowserRouter(
  isDesktop
    ? [
        {
          path: '/',
          element: <Verify />,
          children: [
            { path: '/review', element: <Review /> },
            {
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

export default router;
