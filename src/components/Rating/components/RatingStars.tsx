import styled from 'styled-components';

import { FaStar, FaStarHalf } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { averageRatingState } from '../../../recoil/detailState';

export default function RatingStars() {
  const averageRating = useRecoilValue(averageRatingState);
  return (
    <Container>
      <div className="ratingStars">
        {[1, 2, 3, 4, 5].map((num) => (
          <StarContainer key={num}>
            <Star
              key={num}
              color={
                num <= Math.floor(Number(averageRating)) ? '#96b490' : '#ebebeb'
              }
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  .ratingStars {
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

const RatingAverage = styled.p`
  font-size: 14px;
  color: #a1a1a1;
  padding: 0 7px;
  color: #525463;
  font-size: 18px;
  font-weight: 700;
`;
