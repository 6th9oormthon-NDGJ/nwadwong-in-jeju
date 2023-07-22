import { styled } from 'styled-components';

interface Props {
  point: number;
  maxPoint: number;
}

const ProgressBar = ({ point, maxPoint }: Props) => {
  const percent = point / maxPoint;
  return (
    <Container percent={percent}>
      <div className="bar">
        <div className="bar-fill"></div>
      </div>
      <span className="point">
        <span className="current-point">{point.toLocaleString()}</span>/
        <span className="max-point">{maxPoint.toLocaleString()} POINT</span>
      </span>
    </Container>
  );
};

const Container = styled.div<{ percent: number }>`
  .bar {
    width: 80%;
    height: 6px;
    margin-bottom: 6px;
    background-color: #e6e6e6;
    overflow: hidden;

    .bar-fill {
      width: ${({ percent }) => percent * 100}%;
      height: 100%;
      background-color: #b4f3a8;
    }
  }

  .point {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 16px;

    .current-point {
      color: #000;
    }

    .max-point {
      font-size: 12px;
      color: #a9abb8;
    }
  }
`;

export default ProgressBar;
