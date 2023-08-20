import { createBrowserRouter } from 'react-router-dom';
import Verify from './components/Verify/Verify.tsx';
import { isDesktop } from 'react-device-detect';

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
      ],
);
