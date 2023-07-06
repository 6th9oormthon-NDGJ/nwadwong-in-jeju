import styled from 'styled-components';
import MapHeader from './MapHeader';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();

  if (['/login', '/mypage', '/donation', '/donation-input'].includes(pathname)) {
    return <></>;
  }

  return (
    <HeaderContainer>
      <MapHeader />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
<<<<<<< HEAD
  height: fit-content;
=======
  height: 10%;
>>>>>>> feature-StoreDetail
`;
