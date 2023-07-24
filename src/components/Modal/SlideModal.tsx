import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../recoil/detailState';
import PlainButton from '../Button/PlainButton';

interface SlideModalProps {
  modalText?: string;
  modalContent: () => React.ReactNode;
  closeEvent?: () => void;
  buttonRightText: string;
  buttonRightEvent: () => void;
  desactiveCondition: boolean | null;
  reportType?: string;
}

type CloseEventType = (() => void) | undefined;

export default function SlideModal({
  modalText,
  modalContent,
  closeEvent,
  buttonRightText,
  buttonRightEvent,
  desactiveCondition,
}: SlideModalProps) {
  const setIsSlideModalOpen = useSetRecoilState(modalState);

  const closeModal = (closeEvent: CloseEventType) => {
    setIsSlideModalOpen(false);
    if (closeEvent) {
      closeEvent();
    }
  };

  return (
    <ModalContainer>
      <ModalBackground />
      <BottomSheet>
        {!!modalText && <ModalText>{modalText}</ModalText>}
        {modalContent()}
        <ButtonBox>
          <PlainButton
            width="half"
            event={() => closeModal(closeEvent)}
            text="취소하기"
            style="transparent"
          />
          <PlainButton
            width="half"
            event={() => closeModal(buttonRightEvent)}
            text={buttonRightText}
            style={desactiveCondition ? 'desactive' : 'default'}
            disabled={desactiveCondition ? true : false}
          />
        </ButtonBox>
      </BottomSheet>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  min-width: 360px;
  max-width: 430px;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 100;
  position: relative;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: fadeIn;
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const BottomSheet = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 316px;
  padding: 0 20px;
  background-color: #ffffff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  z-index: 200;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: slideUp;
  animation-fill-mode: forwards;

  @keyframes slideUp {
    from {
      transform: translateY(200px);
    }
  }
`;

const ModalText = styled.p`
  margin-top: 52px;
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #2b2d36;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 70px;
  width: calc(100% - 40px);
`;
