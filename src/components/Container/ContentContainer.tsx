import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { checkValidToken } from '../../api/authApi';
import { useSetRecoilState } from 'recoil';
import userState from '../../recoil/userState';

export default function ContentContainer({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);

  const token = localStorage.getItem('token');

  async function getUserData() {
    const user = await checkValidToken();
    setUserState(user);
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getUserData();
    }
  }, [token]);

  return <ContentBox>{children}</ContentBox>;
}

const ContentBox = styled.div`
  position: relative;
  min-width: 360px;
  max-width: 430px;
  width: 100%;
  flex-grow: 1;
  overflow: scroll;
  margin: 0 auto;
  padding: 0 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
