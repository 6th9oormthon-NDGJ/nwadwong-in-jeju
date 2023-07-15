import { styled } from 'styled-components';
import ShadowButton from '../../components/Button/ShadowButton';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userState from '../../recoil/userState';
import { usePostDonation } from '../../api/organizationApi';
import { checkValidToken } from '../../api/authApi';

export default function DonataionInputPage() {
  const ref = useRef<HTMLInputElement>(null);
  const [point, setPoint] = useState<number>(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);

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

    mutate();
  }

  const { mutate } = usePostDonation(id!, point, {
    onSuccess: async () => {
      const user = await checkValidToken();
      setUser(user!);
      navigate('/');
    },
  });

  return (
    <Container>
      <div className="post-donation">
        <input
          onChange={(e) => setPoint(+e.target.value)}
          type="number"
          min={0}
          max={user?.point}
          step={100}
          maxLength={10}
        />
        <p className="current-point">총 {user?.point.toLocaleString()}원 보유</p>
        <ShadowButton onClick={donationHandler}>포인트 기부하기</ShadowButton>
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
    margin-top: 200px;

    .current-point {
      color: #b3b3b3;
    }

    input {
      width: 200px;
      height: 50px;
      border: none;
      border-bottom: 2px solid #000;
      font-size: 24px;
      text-align: center;
    }
  }
`;
