import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';

export default function BigHeader() {
  const { pathname } = useLocation();

  const matchedTitle = TITLE_DATA_BIGHEADER.find((item) => pathname.includes(item.path))?.title || '';
  return (
    <Container>
      <div className="upper">
        <h2>{matchedTitle}</h2>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 44px;
  display: flex;
  flex-direction: column;

  .upper {
    margin-bottom: 17px;
    /* border-bottom: 1px solid #858899; */

    h2 {
      padding: 34px 0 24px 0;
      margin-left: 20px;
      font-weight: 700;
      font-size: 24px;
    }
  }
`;

const TITLE_DATA_BIGHEADER = [
  {
    id: 1,
    path: '/mypage',
    title: '내 정보',
  },
  { id: 2, path: '/donation', title: '지금 바로, 수눌음' },
];
