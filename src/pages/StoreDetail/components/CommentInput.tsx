import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import useAxios from '../../../hooks/useAxios';
import {
  inputState,
  commentDataState,
  isEditState,
  currentCommentIdState,
} from '../../../recoil/commentState';
import { useParams } from 'react-router-dom';

interface newCommenttype {
  cupStoreName: string;
  content: string;
  createdAt: string;
  commentNickname: string;
  commentId: number;
}

type ButtonProps = {
  isActive: boolean;
};

export default function CommentInput() {
  const [, , , fetchData] = useAxios();
  const params = useParams();
  const cupStoreId = params.id;

  const token = localStorage.getItem('token');

  const [content, setContent] = useRecoilState(inputState);
  const [commentData, setCommentData] = useRecoilState(commentDataState);
  const currentCommentId = useRecoilValue(currentCommentIdState);
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const postHandler = () => {
    if (content) {
      fetchData({
        url: '/api/comment',
        method: 'POST',
        headers: {
          authorization: token,
          'Content-Type': `application/json`,
        },
        data: { cupStoreId: cupStoreId, content: content },
      }).then((el: newCommenttype) => {
        setContent('');
        if (el) {
          setCommentData((prevData) => [
            {
              content: el.content,
              createdAt: el.createdAt,
              commentNickname: el.commentNickname,
              commentId: el.commentId,
            },
            ...prevData,
          ]);
        }
      });
    }
  };

  const patchHandler = () => {
    fetchData({
      url: '/api/comment',
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': `application/json`,
      },
      data: { commentId: currentCommentId, content: content },
    }).then((el: newCommenttype) => {
      setContent('');
      const index = commentData.findIndex(
        (obj) => obj.commentId === currentCommentId
      );
      if (el) {
        setCommentData((prevCommentData) => {
          const updatedCommentData = [...prevCommentData];
          updatedCommentData[index] = {
            ...updatedCommentData[index],
            content: el.content,
          };
          return updatedCommentData;
        });
      }
      setIsEdit(false);
    });
  };

  const enterEvent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      isEdit ? patchHandler() : postHandler();
    }
  };

  return (
    <CommentInputContainer>
      <CommentInputPlace
        placeholder="댓글을 입력해 주세요."
        onChange={changeHandler}
        value={content}
        onKeyPress={enterEvent}
        readOnly={!token}
      ></CommentInputPlace>
      <SubmitButton
        onClick={isEdit ? patchHandler : postHandler}
        disabled={!token}
        isActive={Boolean(content)}
      >
        {isEdit ? '수정하기' : '작성하기'}
      </SubmitButton>
    </CommentInputContainer>
  );
}
const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CommentInputPlace = styled.textarea`
  width: 100%;
  height: 74px;
  padding-left: 15px;
  padding-top: 15px;
  border: 0.85px solid #e1e1e8;
  border-radius: 8px;
  outline: none;
  resize: none;
  font-family: inherit;
  background-color: transparent;
  color: #a1a1a1;
  font-size: 14px;
`;

const SubmitButton = styled.button<ButtonProps>`
  width: 76px;
  height: 30px;
  margin-top: 5px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.isActive ? '#313641' : '#f0f0f5')};
  font-size: 12px;
  color: ${(props) => (props.isActive ? '#ffffff' : '#cdced6')};

  &:hover {
    cursor: pointer;
  }
`;
