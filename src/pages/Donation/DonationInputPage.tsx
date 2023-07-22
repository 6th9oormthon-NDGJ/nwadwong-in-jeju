import { styled } from 'styled-components';
import ShadowButton from '../../components/Button/ShadowButton';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import userState from '../../recoil/userState';
import { usePostDonation } from '../../api/organizationApi';
import { checkValidToken } from '../../api/authApi';
import donationCompleteState from '../../recoil/donationCompleteState';
import Keypad from '../../components/Keypad/Keypad';

const MAX_DONATION_POINT = 1000000;

export default function DonationInputPage() {
  const [point, setPoint] = useState<number>(0);
  const { id } = useParams();
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);

  const setDonationComplete = useSetRecoilState(donationCompleteState);

  const clickKeyHandler = (value: string) => {
    if (value === 'clear') {
      return setPoint(0);
    }

    if (value === 'delete') {
      return setPoint((prev) => {
        const str = String(prev);
        const res = str.slice(0, -1);
        return Number(res);
      });
    }

    const total = String(point) + value;

    const combined = point ? Number(total) : Number(value);

    if (combined > MAX_DONATION_POINT) {
      setPoint(MAX_DONATION_POINT);
      alert(`최대 기부 금액은 ${MAX_DONATION_POINT.toLocaleString()}원입니다!`);
      return;
    }

    setPoint(combined);
  };

  async function donationHandler() {
    if (!user) return;

    if (point < 1000) {
      alert('최소 입력 포인트는 1000 포인트입니다!');
      return;
    }

    if (point % 1000 !== 0) {
      alert('1000 포인트 단위의 포인트를 입력해주세요!');
      return;
    }

    if (point > user.point) {
      alert('보유한 포인트 이하의 값을 입력해주세요!');
      return;
    }

    setDonationComplete({
      complete: true,
      point,
    });

    mutate();
  }

  const { mutate } = usePostDonation(id!, point, {
    onSuccess: async () => {
      const user = await checkValidToken();
      setUser(user!);
    },
  });

  return (
    <Container>
      <div className="post-donation">
        <input
          value={point.toLocaleString() + ' 포인트'}
          disabled
        />
        <p className="current-point">총 {user?.point.toLocaleString()}원 보유</p>
        <ShadowButton onClick={donationHandler}>포인트 기부하기</ShadowButton>
        <Keypad onClick={clickKeyHandler} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .post-donation {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 10vh;

    .current-point {
      color: #b3b3b3;
    }

    input {
      width: 200px;
      height: 50px;
      border: none;
      border-bottom: 2px solid #000;
      font-family: Pretendard;
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }
  }
`;
