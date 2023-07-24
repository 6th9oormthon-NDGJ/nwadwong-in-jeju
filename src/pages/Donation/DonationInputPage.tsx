import { styled } from 'styled-components';
import ShadowButton from '../../components/Button/ShadowButton';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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

    if (point < 100) {
      alert('최소 입력 포인트는 100 포인트입니다!');
      return;
    }

    if (point % 100 !== 0) {
      alert('100 포인트 단위의 포인트를 입력해주세요!');
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
        <div className="point-input">
          <input
            value={point.toLocaleString() + ' 포인트'}
            disabled
          />
          <div className="input-bottom-line"></div>
        </div>
        <p className="current-point">총 {user?.point.toLocaleString()} 포인트 보유</p>
        <div className="donate-btn">
          <ShadowButton onClick={donationHandler}>포인트 기부하기</ShadowButton>
        </div>
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
    margin-top: 120px;

    .current-point {
      margin-bottom: 50px;
      font-size: 13px;
      color: #b3b3b3;
    }

    .donate-btn button {
      margin-bottom: 50px;
      box-shadow: none;
    }

    .point-input {
      position: relative;
      margin-bottom: 16px;

      input {
        position: relative;
        width: 200px;
        height: 50px;
        border: none;
        font-family: Pretendard;
        font-size: 24px;
        font-weight: 600;
        text-align: center;
        background-color: #fff;
      }

      .input-bottom-line {
        width: 200px;
        height: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-image: url(/images/donation/input-bottom-line.png);
      }
    }
  }
`;
