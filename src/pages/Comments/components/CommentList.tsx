import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { commentDataState } from '../../../recoil/commentState';
import DropDownBtn from './DropDownBtn';
import userState from '../../../recoil/userState';
import { displayCreatedAt } from './DisplayCreatedAt';

export default function CommentList() {
  const commentData = useRecoilValue(commentDataState);
  const user = useRecoilValue(userState);

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
                {user?.id === item.memberId && (
                  <DropDownBtn commentObj={item} />
                )}
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
  color: #90949b;
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
  font-size: 16px;
  line-height: 22px;
`;
