import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  averageRatingState,
  ratingModalState,
  starIndexState,
} from '../../../recoil/detailState';
import useAxios from '../../../hooks/useAxios';
import { useParams } from 'react-router-dom';

export default function Rating() {
  const params = useParams();
  const cupStoreId = Number(params.id);
  const [, , , fetchData] = useAxios();
  const [starIndex, setStarIndex] = useRecoilState(starIndexState);
  const setIsRatingModalOpen = useSetRecoilState(ratingModalState);
  const setAverageRating = useSetRecoilState(averageRatingState);

  const token = localStorage.getItem('token');

  const handleFillStar = (num: number) => {
    setStarIndex(Number(num.toFixed(1)));
  };

  const ratingHandler = () => {
    fetchData({
      url: '/api/rating',
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': `application/json`,
      },
      data: { cupStoreId: cupStoreId, rating: starIndex },
    }).then((result: { averageRating: number }) => {
      setAverageRating(result.averageRating.toFixed(1));
      setIsRatingModalOpen(false);
      console.log(result);
    });
  };

  return (
    <RatingModal>
      <ModalBackground />
      <BottomSheet>
        <RatingText>반납 경험이 어떠셨나요?</RatingText>
        <RatingContainer>
          <div className="ratingLeft">
            {[1, 2, 3, 4, 5].map((num) => (
              <StarContainer key={num} onClick={() => handleFillStar(num)}>
                <Star
                  key={num}
                  color={num <= starIndex ? '#96b490' : '#ebebeb'}
                />
              </StarContainer>
            ))}
          </div>
        </RatingContainer>
        <RatingAverage>
          <p className="starIndex">{starIndex}.0</p>
          <p>/ 5.0</p>
        </RatingAverage>
        <BtnBox>
          <BtnLeft onClick={() => setIsRatingModalOpen(false)}>
            취소하기
          </BtnLeft>
          <BtnRight onClick={() => ratingHandler()}>별점 등록</BtnRight>
        </BtnBox>
      </BottomSheet>
    </RatingModal>
  );
}

const RatingModal = styled.div`
  min-width: 360px;
  max-width: 414px;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ModalBackground = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  opacity: 90%;
  z-index: 100;
  position: relative;
  animation-duration: 0.25s; //진행시간
  animation-timing-function: ease-out; //처음엔 빨리나타다가 서서히 느려진다.
  animation-name: fadeIn; //사용되는 트랜지션 효과이름
  animation-fill-mode: forwards; //트랜지션효과가 나타난 이후 그대로 유지한다.

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

const RatingText = styled.p`
  margin-top: 52px;
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #2b2d36;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .ratingLeft {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const StarContainer = styled.div`
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

const Star = styled(FaStar)`
  width: 33px;
  height: 33px;
  color: ${(props) => props.color};
`;

const RatingAverage = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #b3b3b3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  .starIndex {
    font-size: 24px;
    color: #000000;
    margin-right: 3px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
`;

const BtnLeft = styled.button`
  width: 48.5%;
  height: 50px;
  border: 1px solid #e1e2ea;
  border-radius: 8px;
  background-color: transparent;
  color: #525463;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: #e1e2ea;
  }
`;

const BtnRight = styled(BtnLeft)`
  border: none;
  color: #000000;
  background-color: #b4f3a8;

  &:hover {
    background-color: #a8e09d;
  }
`;
