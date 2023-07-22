import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav/BottomNav';
import Header from './components/Header/Header';
import Container from './components/Container/ScreenContainer';
import ContentContainer from './components/Container/ContentContainer';
import UploadSuccess from './pages/UploadImage/UploadSuccess';
import { uploadSuccessState } from './recoil/uploadSuccessState';
import { useRecoilValue } from 'recoil';
import donationCompleteState from './recoil/donationCompleteState';
import DonationCompleteLayer from './pages/Donation/DonationCompleteLayer';
import { modalState } from './recoil/detailState';
import Rating from './pages/Rating/RatingModal';
import ReportModal from './pages/Report/components/ReportModal';
import './App.css';

export default function App() {
  const { pathname } = useLocation();
  const isSuccess = useRecoilValue(uploadSuccessState);
  const donationComplete = useRecoilValue(donationCompleteState);
  const isModalOpen = useRecoilValue(modalState);

  const showModal =
    pathname.includes('/detail') && isModalOpen ? (
      <Rating />
    ) : pathname.includes('/report') && isModalOpen ? (
      <ReportModal />
    ) : null;

  return (
    <Container>
      {isSuccess && <UploadSuccess />}
      {donationComplete.complete && <DonationCompleteLayer />}
      {showModal}

      <Header />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <BottomNav />
    </Container>
  );
}
