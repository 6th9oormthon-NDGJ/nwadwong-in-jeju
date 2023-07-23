import { useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function BottomNav() {
  const { pathname } = useLocation();
  const home = pathname.includes('/home');

  if (
    ['/login'].includes(pathname) ||
    pathname.includes('/detail') ||
    pathname.includes('/uploadImage') ||
    pathname.includes('/submit') ||
    pathname.includes('/report')
  ) {
    return <></>;
  }
  return (
    <NavContainer home={home}>
      <NavLink
        className={({ isActive }) => (isActive ? 'active' : '')}
        to={'/donation'}
      >
        <svg
          width="23"
          height="35"
          viewBox="0 0 23 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 3.4634C23 3.10398 22.6994 2.8118 22.3296 2.8118H21.9234V0.676054C21.9234 0.303185 21.6127 0 21.2279 0H1.77213C1.38853 0 1.07661 0.301962 1.07661 0.676054V2.8118H0.670367C0.300596 2.8118 0 3.10398 0 3.4634V5.01233H0.652759L5.14661 34.0741H18.1942L22.3498 5.01233H23V3.4634Z"
            fill="#B3B3B3"
          />
        </svg>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'active' : '')}
        to={'/home'}
      >
        <svg
          width="28"
          height="34"
          viewBox="0 0 28 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.9999 16.9999C12.1666 16.9999 10.6666 15.4999 10.6666 13.6666C10.6666 11.8333 12.1666 10.3333 13.9999 10.3333C15.8332 10.3333 17.3332 11.8333 17.3332 13.6666C17.3332 15.4999 15.8332 16.9999 13.9999 16.9999ZM13.9999 0.333252C6.9999 0.333252 0.666565 5.69992 0.666565 13.9999C0.666565 19.5333 5.11657 26.0833 13.9999 33.6666C22.8832 26.0833 27.3332 19.5333 27.3332 13.9999C27.3332 5.69992 20.9999 0.333252 13.9999 0.333252Z"
            fill="#B3B3B3"
          />
        </svg>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? 'active' : '')}
        to={'/mypage'}
      >
        <svg
          width="30"
          height="31"
          viewBox="0 0 30 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 30.651H30V28.436C30 22.411 23.2825 17.526 15 17.526C6.7175 17.526 0 22.411 0 28.436V30.651ZM15 15.261C10.9 15.261 7.5775 11.9385 7.5775 7.83852C7.5775 3.73852 10.9 0.416016 15 0.416016C19.1 0.416016 22.4225 3.73852 22.4225 7.83852C22.4225 11.9385 19.1 15.261 15 15.261Z"
            fill="#B3B3B3"
          />
        </svg>
      </NavLink>
    </NavContainer>
  );
}

const NavContainer = styled.div<{ home: boolean }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 72px;
  background-color: #f7f7fa;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  z-index: 9999;
  ${(props) => (props.home ? 'position: fixed; left: 50%; transform: translate(-50%, 0%); bottom: 0;' : '')};
  min-width: 360px;
  max-width: 430px;
  box-shadow: -1px -8px 15px 0px rgba(0, 0, 0, 0.07);

  a {
    width: 56px;
    height: 56px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a.active {
    background-color: #000;
    border-radius: 50%;
    path {
      fill: #b4f3a8;
    }
  }
`;
