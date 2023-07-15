import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { commentDataState } from '../../../recoil/commentState';
import DropDownBtn from './DropDownBtn';

export function displayCreatedAt(created_at: string) {
  const milliSeconds: number =
    new Date().getTime() - new Date(created_at).getTime();
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}시간 전`;
  } else {
    return (
      <span>
        {created_at.split('T')[0]}&nbsp;&nbsp;
        {created_at.split('T')[1].split(':')[0]}:
        {created_at.split('T')[1].split(':')[1]}
      </span>
    );
  }
}

export default function CommentList() {
  const commentData = useRecoilValue(commentDataState);

  return (
    <div>
      {commentData?.map((item, idx) => {
        return (
          <CommentBox key={idx}>
            <CommentHeader>
              <CommentLeft>
                <CommentUser>{item.commentNickname}</CommentUser>
                <DivideDot>·</DivideDot>
                <CreatedAt>
                  {item.createdAt && displayCreatedAt(item.createdAt)}
                </CreatedAt>
              </CommentLeft>
              <CommentRight>
                <DropDownBtn commentObj={item} />
              </CommentRight>
            </CommentHeader>
            <CommentContent>{item.content}</CommentContent>
          </CommentBox>
        );
      })}
    </div>
  );
}

const CommentBox = styled.div`
  padding: 25px 10px;
`;

const CommentLeft = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 22px;
`;

const CommentRight = styled.div`
  display: flex;
  align-items: center;
`;

const CommentHeader = styled.div`
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const CommentUser = styled.div`
  color: #333338;
  font-size: 16px;
`;

const DivideDot = styled.div`
  padding: 0 8px;
  color: #90949b;
`;

const CreatedAt = styled.div`
  color: #90949b;
  font-size: 14px;
`;

const CommentContent = styled.div`
  color: #333338;
  font-size: 14px;
  line-height: 22px;
`;
