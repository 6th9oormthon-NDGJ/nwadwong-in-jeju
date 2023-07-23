import { styled } from 'styled-components';
import { loginWithKakao } from '../../utils/loginWithKakao';

const KakaoLoginButton = () => {
  return (
    <Container onClick={loginWithKakao}>
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 0C4.70088 0 0 3.69847 0 8.26093C0 11.2307 1.99197 13.833 4.98101 15.2892C4.76125 16.1056 4.18575 18.2455 4.07043 18.7035C3.92846 19.2719 4.27985 19.2643 4.50995 19.1111C4.69054 18.9915 7.38748 17.1671 8.551 16.3795C9.18254 16.4726 9.83365 16.5219 10.5 16.5219C16.2991 16.5219 21 12.8228 21 8.26093C21 3.69901 16.2991 0 10.5 0Z"
          fill="#191600"
        />
      </svg>
      카카오로 시작하기
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: calc(100vw - 40px);
  max-width: 335px;
  padding: 16px;
  background-color: #fee500;
  border-radius: 8px;
  border: none;
  font-size: 16px;

  z-index: 1;
`;

export default KakaoLoginButton;
