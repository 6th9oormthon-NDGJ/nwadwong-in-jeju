import styled from 'styled-components';
import { FaChevronLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SmallHeader() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const matchedTitle = TITLE_DATA.find((item) => pathname.includes(item.path))?.title || '';

  return (
    <Header>
      <div className="title">
        <BackIcon onClick={() => navigate('/home')} />
        <Title>{matchedTitle}</Title>
      </div>
    </Header>
  );
}

const Header = styled.div`
  height: 113px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 17px;

  .title {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 64px 0 0 0;
  }
`;

const BackIcon = styled(FaChevronLeft)`
  width: 15px;
  height: 15px;
  left: 12px;
  position: absolute;

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #252730;
`;

const TITLE_DATA = [
  {
    id: 1,
    path: '/uploadImage',
    title: '반납 인증',
  },
  { id: 2, path: '/detail', title: '위치 상세보기' },
  { id: 3, path: '/submit', title: '포인트 기부하기' },
  { id: 4, path: '/report', title: '기기 제보' },
];
