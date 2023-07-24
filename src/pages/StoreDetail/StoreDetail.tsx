import styled from 'styled-components';
import useAxios from '../../hooks/useAxios';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { commentDataState } from '../../recoil/commentState';
import { averageRatingState, detailState, modalState } from '../../recoil/detailState';
import Comments from '../Comments/Comments';
import { useNavigate, useParams } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import PlainButton from '../../components/Button/PlainButton';
import machine from '/images/cup-store.png';

export interface detailDataType {
  imageUrl: string;
  name: string;
  roadAddress: string;
  hours: string;
  averageRating: number;
  comments: commentDataType[];
  totalComments: number;
  totalRatingPeople: number;
}

export interface commentDataType {
  commentNickname: string;
  createdAt: string;
  content: string;
  commentId: number;
  memberId: string | undefined;
}

export default function StoreDetail() {
  const params = useParams();
  const cupStoreId = params.id;
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [, , , fetchData] = useAxios();

  const [detail, setDetail] = useRecoilState(detailState);
  const setIsModalOpen = useSetRecoilState(modalState);
  const setCommentData = useSetRecoilState(commentDataState);
  const [averageRating, setAverageRating] = useRecoilState(averageRatingState);

  function isOpenNow(hours: string) {
    const now = new Date();
    const currentHour = now.getHours();
    if (Number(hours.split('~')[0]) < currentHour && currentHour - 5 < Number(hours.split('~')[1])) {
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
      url: `https://goormtone6th.com/detail?cupStoreId=${cupStoreId}`,
      headers: {
        Authorization: token,
      },
    }).then((result: detailDataType) => {
      if (result) {
        setDetail(result);
        setCommentData(result.comments);
        setAverageRating(result.averageRating.toFixed(1));
      }
    });
  }, []);

  return (
    <>
      <ThumbnailBox>
        <ThumbnailImage src={machine}></ThumbnailImage>
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
        <RatingContainer>
          <div className="ratingLeft">
            {[1, 2, 3, 4, 5].map((num) => (
              <StarContainer key={num}>
                <Star
                  key={num}
                  color={num <= Math.floor(Number(averageRating)) ? '#96b490' : '#ebebeb'}
                />
              </StarContainer>
            ))}
            <RatingAverage>{averageRating}</RatingAverage>
          </div>
          <div className="halfStars">
            {[0, 1, 2, 3, 4].map((num) => (
              <StarContainer key={num}>
                <HalfStar
                  key={num}
                  color={num < Number(averageRating) ? '#96b490' : '#ebebeb'}
                />
              </StarContainer>
            ))}
          </div>
          <div
            className="ratingRight"
            onClick={() => setIsModalOpen(true)}
          >
            <RatingText>별점</RatingText>
            <UserActionArrow />
          </div>
        </RatingContainer>
        <ButtonBox>
          <PlainButton
            width="half"
            text="기기 제보"
            event={() => navigate(`/report/${cupStoreId}`)}
            style="transparent"
          />
          <PlainButton
            width="half"
            text="반납 인증"
            event={() => navigate(`/uploadImage/${cupStoreId}`)}
            style="default"
          />
        </ButtonBox>
      </DetailHeader>
      <Comments />
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
  font-weight: 700;
  color: #2b2d36;
`;

const StoreAddress = styled.p`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
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
  height: 28px;
  border: 1px solid #e1e1e8;
  background-color: #fbfbfc;
  border-radius: 8px;
  font-size: 14px;
  color: #525463;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hours = styled.p`
  font-size: 14px;
  color: #a1a1a1;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .ratingLeft {
    display: flex;
    align-items: center;
    position: relative;
  }

  .ratingRight {
    display: flex;
    align-items: center;
  }

  .halfStars {
    position: absolute;
    display: flex;
  }
`;

const StarContainer = styled.div`
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Star = styled(FaStar)`
  width: 20px;
  height: 20px;
  margin: 0 2px;
  color: ${(props) => props.color};
`;

const HalfStar = styled(FaStarHalf)`
  width: 20px;
  height: 20px;
  margin: 0 2px;
  color: ${(props) => props.color};
`;

const RatingAverage = styled(Hours)`
  padding: 0 7px;
  color: #525463;
  font-size: 18px;
  font-weight: 700;
`;

const RatingText = styled(Hours)`
  &:hover {
    cursor: pointer;
  }
`;

const UserActionArrow = styled(FiChevronRight)`
  width: 20px;
  height: 20px;
  color: #a1a1a1;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 45px;
`;
