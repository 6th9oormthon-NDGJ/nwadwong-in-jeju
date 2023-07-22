import React from 'react';
import { styled } from 'styled-components';

const Badge = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: fit-content;
  padding: 4px 6px 3px 6px;
  border-radius: 8px;
  border: 1px solid var(--light-gray-gray-300, #e1e1e8);
  background: var(--light-gray-gray-400-transparent-8, rgba(205, 206, 214, 0.08));
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  white-space: nowrap;
`;

export default Badge;
