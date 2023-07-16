import styled from 'styled-components';
import useAxios from '../../hooks/useAxios';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { commentDataState } from '../../recoil/commentState';
import { detailState } from '../../recoil/detailState';
import Comments from './Comments';
import { useNavigate, useParams } from 'react-router-dom';

export interface detailDataType {
  imageUrl: string;
  name: string;
  roadAddress: string;
  hours: string;
  averageRating: number;
  comments: commentDataType[];
  totalComments: number;
}

export interface commentDataType {
  commentNickname: string;
  createdAt: string;
  content: string;
  commentId: number;
  memberId: string | undefined;
}

export default function StoreDetail() {
  const token = localStorage.getItem('token');
  const [, , , fetchData] = useAxios();
  const navigate = useNavigate();
  const [detail, setDetail] = useRecoilState(detailState);
  const setCommentData = useSetRecoilState(commentDataState);
  const params = useParams();
  const cupStoreId = params.id;

  function isOpenNow(hours: string) {
    const now = new Date();
    const currentHour = now.getHours();
    if (
      Number(hours.split('~')[0]) < currentHour &&
      currentHour < Number(hours.split('~')[1])
    ) {
      return '운영중';
    } else {
      return '운영종료';
    }
  }

  function displayTime(hours: string) {
    return hours.split('~')[0] + ':00' + ' - ' + hours.split('~')[1] + ':00';
  }

  useEffect(() => {
    fetchData({
      url: `/api/detail?cupStoreId=${cupStoreId}`,
      headers: {
        Authorization: token,
        'Content-Type': `application/json`,
      },
    }).then((result: detailDataType) => {
      if (result) {
        setDetail(result);
        setCommentData(result.comments);
      }
    });
  }, []);

  return (
    <>
      <ThumbnailBox>
        <ThumbnailImage src={detail?.imageUrl}></ThumbnailImage>
      </ThumbnailBox>
      <DetailHeader>
        <StoreInfo>
          <StoreName>{detail?.name}</StoreName>
          <StoreAddress>{detail?.roadAddress}</StoreAddress>
          <StoreHours>
            <IsOpen>{detail?.hours && isOpenNow(detail.hours)}</IsOpen>
            <Hours>운영시간 {detail?.hours && displayTime(detail.hours)}</Hours>
          </StoreHours>
        </StoreInfo>
      </DetailHeader>
      <Comments />
      <SubmitBtn onClick={() => navigate(`/uploadImage/${cupStoreId}`)}>
        반납 인증
      </SubmitBtn>
    </>
  );
}

const ThumbnailBox = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StoreName = styled.p`
  font-size: 20px;
  line-height: 30px;
  font-weight: bold;
`;

const StoreAddress = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #a1a1a1;
`;

const StoreHours = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IsOpen = styled.div`
  padding: 0 8px;
  height: 24px;
  border: 1px solid #e1e1e8;
  background-color: #fbfbfc;
  border-radius: 8px;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hours = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: #a1a1a1;
`;

const SubmitBtn = styled.button`
  width: 166px;
  height: 50px;
  border: none;
  border-radius: 8px;
  background-color: #b4f3a8;
  box-shadow: 0px 4px 13px -4px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 620px;
  left: 50%;
  transform: translate(-50%, 0%);
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }
`;
