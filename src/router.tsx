import { createBrowserRouter } from 'react-router-dom';
import AuthorityManage from './pages/AuthorityManage/AuthorityManage.tsx';
import Review from './pages/Review/Review.tsx';
import Verify from './components/Verify/Verify.tsx';

const router = createBrowserRouter([
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
]);

export default router;
