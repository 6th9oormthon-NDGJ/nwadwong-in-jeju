import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import userState from '../../recoil/userState';

const MapHeader = () => {
  const user = useRecoilValue(userState);
  return (
    <Container>
      <div className="upper">
        <p>{user?.nickname ? user.nickname : '방문객'}님,</p>
        <div className="second-line">
          <p>여기에</p>
          <CupImage src="/images/uploadImage/cup.svg"></CupImage>
          <p>놔뒁</p>
        </div>
      </div>
      <div className="lower">
        <div className="cup-type">
          <div className="circle reusable" />
          <p className="cupCategory">다회용컵</p>
        </div>
        <div className="cup-type">
          <div className="circle disposable" />
          <p className="cupCategory">일회용컵</p>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 12px;
  display: flex;
  flex-direction: column;

  .upper {
    border-bottom: 1px solid #858899;
    padding: 34px 0 24px 20px;

    .second-line {
      display: flex;
    }

    p {
      font-weight: 700;
      font-size: 24px;
      line-height: 36px;
      :last-child {
        margin-left: 0px;
      }
    }
  }
  .lower {
    display: flex;
    align-items: center;
    height: 48px;

    .cup-type {
      margin-left: 20px;
      display: flex;
      gap: 4px;
      font-size: 16px;

      .cupCategory {
        font-size: 16px;
        color: #2b2d36;
      }

      .circle {
        width: 14px;
        height: 14px;
        border-radius: 50%;

        &.reusable {
          background-color: #b4f3a8;
          margin-right: 4px;
        }
        &.disposable {
          background-color: #96b490;
          margin-right: 4px;
        }
      }
    }
  }
`;

const CupImage = styled.img`
  height: 28px;
  margin: 0 10px;
  align-self: center;
`;

export default MapHeader;
