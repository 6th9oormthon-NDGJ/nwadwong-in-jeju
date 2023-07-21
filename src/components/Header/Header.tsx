import styled from 'styled-components';
import MapHeader from './MapHeader';
import { useLocation } from 'react-router-dom';
import SmallHeader from './SmallHeader';
import BigHeader from './BigHeader';

export default function Header() {
  const { pathname } = useLocation();

  if (['/login'].includes(pathname)) {
    return <></>;
  } else if (['/mypage', '/donation'].includes(pathname)) {
    return <BigHeader />;
  } else if (
    pathname.includes('/detail') ||
    pathname.includes('/uploadImage') ||
    pathname.includes('/submit') ||
    pathname.includes('/report')
  ) {
    return (
      <HeaderContainer>
        <SmallHeader />
      </HeaderContainer>
    );
  } else {
    return (
      <HeaderContainer>
        <MapHeader />
      </HeaderContainer>
    );
  }
}

const HeaderContainer = styled.div`
  width: 100%;
  height: fit-content;
`;
