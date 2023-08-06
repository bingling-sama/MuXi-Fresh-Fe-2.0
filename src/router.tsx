import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [],
  },
]);

export default router;
