import { styled } from 'styled-components';
import KakaoLoginButton from './loginWithKakao';
import SmileLogo from './SmileLogo';

export default function Login() {
  return (
    <Container>
      <div className="logo">
        <SmileLogo />
      </div>
      <KakaoLoginButton />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15rem 0 10rem 0;
`;
