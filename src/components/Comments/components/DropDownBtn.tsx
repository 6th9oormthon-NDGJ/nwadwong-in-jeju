import styled from 'styled-components';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import useAxios from '../../../hooks/useAxios';
import { ICommentData } from '../../../pages/StoreDetail/StoreDetail';
import { useState } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import {
  commentDataState,
  currentCommentIdState,
  inputState,
  isEditState,
} from '../../../recoil/commentState';
import userState from '../../../recoil/userState';
import { AxiosResponse } from 'axios';

interface IDropDownBtnProps {
  commentObj: ICommentData;
}

interface IDeleteResponse {
  deletedCommentId: number;
}

export default function DropDownBtn({ commentObj }: IDropDownBtnProps) {
  const user = useRecoilValue(userState);

  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const setContent = useSetRecoilState(inputState);
  const setIsEdit = useSetRecoilState(isEditState);
  const setCurrentCommentId = useSetRecoilState(currentCommentIdState);
  const [commentData, setCommentData] = useRecoilState(commentDataState);

  const [, fetchData] = useAxios<IDeleteResponse>();
  const token = localStorage.getItem('token');

  const deleteHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const liElement = e.target as HTMLLIElement;
    const dataValue = parseInt(liElement.getAttribute('data-value') || '0', 10);
    setCurrentCommentId(dataValue);

    fetchData(
      {
        url: `/api/comment?commentId=${commentObj.commentId}`,
        method: 'DELETE',
        headers: {
          authorization: token,
        },
      },
      handleResponse
    );
  };

  const editHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const liElement = e.target as HTMLLIElement;
    const dataContent = liElement.getAttribute('data-content') || '';
    const dataValue = parseInt(liElement.getAttribute('data-value') || '0', 10);
    setContent(dataContent);
    setCurrentCommentId(dataValue);
    setIsEdit(true);
    setIsBtnClicked(false);
  };

  const handleResponse = (response: AxiosResponse<IDeleteResponse>) => {
    const data: IDeleteResponse = response.data;
    const index = commentData.findIndex(
      (obj) => obj.commentId === data.deletedCommentId
    );

    setCommentData((prevCommentData) => {
      const updatedCommentData = [...prevCommentData];
      updatedCommentData.splice(index, 1);
      return updatedCommentData;
    });
    setIsBtnClicked(false);
  };

  return (
    <div onMouseLeave={() => setIsBtnClicked(false)}>
      {user?.id === commentObj.memberId && (
        <EllipsisVertical onClick={() => setIsBtnClicked(!isBtnClicked)} />
      )}
      {isBtnClicked && (
        <DropDownBox>
          <DropDownListFirst
            onClick={editHandler}
            data-content={commentObj.content}
            data-value={commentObj.commentId}
          >
            수정
          </DropDownListFirst>
          <DropDownListLast
            onClick={deleteHandler}
            data-value={commentObj.commentId}
          >
            삭제
          </DropDownListLast>
        </DropDownBox>
      )}
    </div>
  );
}

const EllipsisVertical = styled(HiOutlineEllipsisVertical)`
  color: #90949b;
  width: 19px;
  height: 19px;

  &:hover {
    cursor: pointer;
  }
`;

const DropDownBox = styled.ul`
  border-radius: 10px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 25px;
`;

const DropDownList = styled.li`
  padding: 12px 14px;
  font-size: 14px;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: gray;

  &:hover {
    cursor: pointer;
    background-color: #e8e9ea;
  }
`;

const DropDownListFirst = styled(DropDownList)`
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const DropDownListLast = styled(DropDownList)`
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;
