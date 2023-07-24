import styled from 'styled-components';
import { userPointState } from '../../recoil/userPointState';
import { useRecoilValue } from 'recoil';

export default function UploadSuccess() {
  const userPointData = useRecoilValue(userPointState);

  return (
    <SuccessModal>
      <GainedPoint>
        <AlertBox>
          <img src="/images/uploadImage/cupSymbol.svg" />
          <TextBox>
            <PointText>
              <p className="gainPoint">{userPointData.gainPoint} </p>
              <p className="point">point</p>
            </PointText>
            <AlertText>적립되었습니다.</AlertText>
          </TextBox>
        </AlertBox>
        <EllipseImg src="/images/uploadImage/successAlert.png" />
      </GainedPoint>
    </SuccessModal>
  );
}

const SuccessModal = styled.div`
  min-width: 360px;
  max-width: 430px;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
  opacity: 90%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GainedPoint = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  position: absolute;
`;

const PointText = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 5px;

  .gainPoint {
    font-size: 38px;
  }

  .point {
    font-size: 20px;
    line-height: 36px;
  }
`;

const AlertText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #2b2d36;
  display: flex;
  justify-content: center;
`;

const EllipseImg = styled.img``;
