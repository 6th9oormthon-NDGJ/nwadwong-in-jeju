import { styled } from 'styled-components';

const SmileLogo = () => {
  return (
    <Container>
      <img
        src="/logo/login-logo.png"
        alt="logo"
        className="logo"
      />
      <p>
        컵 반납 후 받은 포인트로 기부까지,
        <br />
        <strong>함께 만들어가는 깨끗한 제주</strong>
      </p>
      <img
        src="/images/login/cups.png"
        alt="cups"
        className="cups"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  p {
    opacity: 0;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    letter-spacing: -0.1px;
    text-align: center;
    color: #2b2d36;
    animation: appearFromBottom 1s 0.3s forwards;
  }

  strong {
    font-weight: 700;
  }

  .logo {
    width: 187px;
    margin-bottom: 24px;
    animation: appearFromBottom 1s forwards;
  }

  .cups {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    animation: appearCup 1s forwards;
  }

  @keyframes appearFromBottom {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes appearCup {
    0% {
      transform: translateY(300px);
    }
    70% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(20px);
    }
  }
`;

export default SmileLogo;
