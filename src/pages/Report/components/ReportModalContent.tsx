import styled from 'styled-components';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { reportDataState } from '../../../recoil/reportState';

export default function ReportModalContent() {
  const reportData = useRecoilValue(reportDataState);
  const { name } = reportData;

  return (
    <ContentContainer>
      <Icon />
      <ModalText>{name}</ModalText>
      <Explanation>제보 내용 확인 후 신속히 처리하겠습니다.</Explanation>
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Icon = styled(AiFillExclamationCircle)`
  width: 49px;
  height: 49px;
`;

const ModalText = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #2b2d36;
  margin-top: 17px;
`;

const Explanation = styled.p`
  font-size: 16px;
  color: #a9abb8;
  margin-top: 8px;
`;
