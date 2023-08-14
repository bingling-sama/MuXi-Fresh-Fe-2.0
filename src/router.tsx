import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import AuthorityManage from './pages/AuthorityManage/AuthorityManage.tsx';
import Review from './pages/Review/Review.tsx';
import Verify from './components/Verify/Verify.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Verify element={<Layout />} />,
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
