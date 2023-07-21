import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import AuthCallback from './pages/Login/AuthCallback';
import UploadImage from './pages/UploadImage/UploadImage';
import MyPage from './pages/MyPage/MyPage';
import Donataion from './pages/Donation/Donation';
import DonataionInputPage from './pages/Donation/DonationInputPage';
import StoreDetail from './pages/StoreDetail/StoreDetail';
import Redirect from './pages/Redirect';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Redirect /> },
      { path: '/home', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/login/auth', element: <AuthCallback /> },
      { path: '/detail/:id', element: <StoreDetail /> },
      { path: '/uploadImage/:id', element: <UploadImage /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/donation', element: <Donataion /> },
      { path: '/donation/:id/submit', element: <DonataionInputPage /> },
      { path: '/donation/:id/submit', element: <DonataionInputPage /> },
    ],
  },
]);

export default router;
