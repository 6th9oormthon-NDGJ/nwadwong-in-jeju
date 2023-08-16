import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { starIndexState } from '../../../recoil/detailState';
import { useRecoilState } from 'recoil';

export default function RatingContent() {
  const [starIndex, setStarIndex] = useRecoilState(starIndexState);
  const handleFillStar = (num: number) => {
    setStarIndex(Number(num.toFixed(1)));
  };

  return (
    <>
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
    </>
  );
}

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
