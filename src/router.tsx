import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import AuthorityManage from './pages/AuthorityManage/AuthorityManage.tsx';
import Review from './pages/Review/Review.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import SignUp from './pages/SignUp/SignUp.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import Verify from './components/Verify/Verify.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Verify element={<Layout />} />,
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/review', element: <Review /> },
      {
        path: '/authority-manage',
        element: <AuthorityManage />,
      },
    ],
  },
  { path: '/login', element: <SignIn /> },
  { path: '/signUp', element: <SignUp /> },
]);

export default router;
