import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import AuthorityManage from './pages/AuthorityManage/AuthorityManage.tsx';
import Review from './pages/Review/Review.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
