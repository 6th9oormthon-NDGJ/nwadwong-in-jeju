import { Outlet } from 'react-router-dom';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
import Container from './components/Container/ScreenContainer';
import ContentContainer from './components/Container/ContentContainer';
import UploadSuccess from './pages/UploadImage/UploadSuccess';
import { uploadSuccessState } from './recoil/uploadSuccessState';
import { useRecoilValue } from 'recoil';
import './App.css';
import { ratingModalState } from './recoil/detailState';
import Rating from './pages/StoreDetail/components/Rating';

export default function App() {
  const isSuccess = useRecoilValue(uploadSuccessState);
  const isRatingModalOpen = useRecoilValue(ratingModalState);

  return (
    <Container>
      {isSuccess && <UploadSuccess />}
      {isRatingModalOpen && <Rating />}
      <Header />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <BottomNav />
    </Container>
  );
}
