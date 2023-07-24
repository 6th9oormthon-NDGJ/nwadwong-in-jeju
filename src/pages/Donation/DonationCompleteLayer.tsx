import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import donationCompleteState from '../../recoil/donationCompleteState';
import { useNavigate } from 'react-router-dom';

const DonationCompleteLayer = () => {
  const [turnOff, setTurnOff] = useState<boolean>(false);
  const [donationComplete, setDonationComplete] = useRecoilState(donationCompleteState);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setTurnOff(true);
    }, 2000);
  }, []);

  return (
    <Container
      onClick={() => {
        if (turnOff) {
          setDonationComplete({
            ...donationComplete,
            complete: false,
          });
          navigate('/donation');
        }
      }}
    >
      <Cups />
      <CompleteCircle point={donationComplete.point} />
    </Container>
  );
};

const CompleteCircle = ({ point }: { point: number }) => {
  return (
    <CircleContainer>
      <img
        src="/images/donation/gradation_circle.png"
        alt="complete-circle"
      />
      <p>
        <strong>
          {point.toLocaleString()} <em>point</em>
        </strong>
        <br />
        기부하셨습니다.
      </p>
    </CircleContainer>
  );
};

const Cups = () => {
  return (
    <CupsContainer>
      <img
        src="/images/donation/cup_group.png"
        alt="cup"
      />
    </CupsContainer>
  );
};

const CupsContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(300px);
  animation: appearCup 1s forwards;

  img {
    width: 100%;
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

const Container = styled.div`
  min-width: 360px;
  max-width: 430px;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
  opacity: 95%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CircleContainer = styled.div`
  position: relative;
  width: 100vw;
  transform: scale(0);
  animation: appearCircle 1s forwards 1s;

  img {
    width: 100%;
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.1px;
    white-space: nowrap;

    strong {
      font-family: Pretendard;
      font-size: 38px;
      font-style: normal;
      font-weight: 700;
      line-height: 57px;
      letter-spacing: -0.4px;

      em {
        font-size: 30px;
      }
    }
  }

  @keyframes appearCircle {
    0% {
      transform: scale(0);
    }
    70% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default DonationCompleteLayer;
