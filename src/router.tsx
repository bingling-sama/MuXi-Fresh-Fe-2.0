import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
// import AuthorityManage from './pages/AuthorityManage/AuthorityManage.tsx';
import Review from './pages/Review/Review.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import SignUp from './pages/SignUp/SignUp.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import Progress from './pages/Progress/Progress.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Navigate to="/signIn" /> },
      { path: '/signIn', element: <SignIn /> },
      { path: '/signUp', element: <SignUp /> },
      { path: '/home', element: <HomePage /> },
      { path: '/progress', element: <Progress /> },
      { path: '/review', element: <Review /> },
      // {
      //   path: '/authority-manage',
      //   element: <AuthorityManage />,
      // },
    ],
  },
]);

export default router;
