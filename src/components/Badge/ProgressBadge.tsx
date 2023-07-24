import { styled } from 'styled-components';

const ProgressBadge = ({ isEnd }: { isEnd: boolean }) => {
  return <Container>{isEnd ? '진행종료' : '진행중'}</Container>;
};

const Container = styled.div`
  width: fit-content;
  padding: 4px 6px 3px 6px;
  border-radius: 8px;
  border: 1px solid #b4f3a8;
  background: #b4f3a8;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
  white-space: nowrap;
`;

export default ProgressBadge;
