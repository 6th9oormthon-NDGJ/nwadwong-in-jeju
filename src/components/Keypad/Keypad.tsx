import { styled } from 'styled-components';

interface PadNumber {
  value: string;
  show: string;
}

const NUMBERS: PadNumber[] = [
  {
    value: '1',
    show: '1',
  },
  {
    value: '2',
    show: '2',
  },
  {
    value: '3',
    show: '3',
  },
  {
    value: '4',
    show: '4',
  },
  {
    value: '5',
    show: '5',
  },
  {
    value: '6',
    show: '6',
  },
  {
    value: '7',
    show: '7',
  },
  {
    value: '8',
    show: '8',
  },
  {
    value: '9',
    show: '9',
  },
  {
    value: 'clear',
    show: 'CLEAR',
  },
  {
    value: '0',
    show: '0',
  },
  {
    value: 'delete',
    show: '←',
  },
];

interface Props {
  onClick(value: string): void;
}

const Keypad = ({ onClick }: Props) => {
  return (
    <Container>
      {NUMBERS.map((num) => {
        return (
          <Key
            className={num.value === 'clear' ? 'clear' : ''}
            onClick={() => onClick(num.value)}
            key={num.value}
          >
            {num.show}
          </Key>
        );
      })}
    </Container>
  );
};

const Key = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #f7f7f7;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 20px;

  &.clear {
    font-size: 14px;
  }
`;

const Container = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  width: 95%;
  height: 30vh;
`;

export default Keypad;
