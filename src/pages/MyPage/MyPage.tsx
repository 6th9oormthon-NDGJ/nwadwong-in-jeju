import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import userState from '../../recoil/userState';
import { useGetAllOrganizations } from '../../api/organizationApi';
import ParticipateList from './ParticipateList';

const MyPage = () => {
  const user = useRecoilValue(userState)!;
  const { data } = useGetAllOrganizations();

  if (!user) {
    return <></>;
  }

  return (
    <Container>
      <UserPoint>
        <div className="user-nickname">
          <h2>
            <strong>{user.nickname}</strong> 님 감사합니다.
          </h2>
        </div>
        <div className="user-point">
          <div className="point-box">
            <img src="/images/uploadImage/cup.svg" />
            <div className="points">
              <p className="point">잔여 포인트: {user.point.toLocaleString()}</p>
              <p className="acc-point">누적 기부 포인트: {user.accumulatePoint.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </UserPoint>
      {data?.organizations && <ParticipateList organizations={data.organizations} />}
    </Container>
  );
};

const Container = styled.div``;

const UserPoint = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 15px 20px;
  border-top: solid #858899 0.245px;
  border-bottom: solid #858899 0.245px;
  background-color: #fff;

  .user-nickname {
    h2 {
      color: var(--gray, #b3b3b3);

      font-family: Pretendard;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.1px;

      strong {
        color: var(--point-2, #96b490);
        font-family: Pretendard;
        font-size: 24px;
        font-weight: 700;
        line-height: 36px; /* 150% */
        letter-spacing: -0.3px;
      }
    }
  }

  .user-point {
    width: fit-content;
    margin: 36px auto;

    .point-box {
      display: flex;
      align-items: center;
      width: fit-content;

      img {
        height: 43px;
        margin-right: 20px;
      }

      .points {
        .point {
          font-family: Pretendard;
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: 27px; /* 150% */
          letter-spacing: -0.1px;
        }
        .acc-point {
          color: var(--gray, #b3b3b3);
          font-feature-settings: 'clig' off, 'liga' off;

          /* subtitle-1 */
          font-family: Pretendard;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 22px; /* 157.143% */
          letter-spacing: -0.1px;
        }
      }
    }
  }
`;

export default MyPage;
