import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
// import AuthorityManage from './pages/AuthorityManage/AuthorityManage.tsx';
import Review from './pages/Review/Review.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import SignUp from './pages/SignUp/SignUp.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import Progress from './pages/Progress/Progress.tsx';
import MobileSignIn from './pages/MobileSignIn/MobileSignIn.tsx';
import MobileSignUp from './pages/MobileSignUp/MobileSignUp.tsx';
import PersonalPage from './pages/PersonalPage/PersonalPage.tsx';
import MobileProgress from './pages/MobileProgress/MobileProgress.tsx';

const router = createBrowserRouter([
  { path: '/login', element: <MobileSignIn /> },
  { path: '/signUp', element: <MobileSignUp /> },
  { path: '/myHomePage', element: <PersonalPage /> },
  { path: '/mobileProgress', element: <MobileProgress /> },
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
