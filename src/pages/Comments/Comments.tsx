import styled from 'styled-components';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';
import { useRecoilValue } from 'recoil';
import { detailState } from '../../recoil/detailState';

export default function Comments() {
  const detail = useRecoilValue(detailState);

  return (
    <CommentContainer>
      <CommentNumber>댓글 {detail?.totalComments}</CommentNumber>
      <CommentInput />
      <CommentList />
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  margin-bottom: 20px;
`;

const CommentNumber = styled.p`
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: #333338;
  border-top: 0.25px solid #858899;
`;
