import './App.less';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffb841',
          borderRadius: 10,
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
