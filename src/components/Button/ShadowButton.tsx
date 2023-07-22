import React from 'react';
import { styled } from 'styled-components';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const ShadowButton = ({ onClick, children }: Props) => {
  return <Container onClick={onClick}>{children}</Container>;
};

const Container = styled.button`
  width: fit-content;
  padding: 14px 24px;
  font-size: 14px;
  font-weight: 600;
  background-color: #e7f6e5;
  border: none;
  border: 1px solid var(--point, #b4f3a8);
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
`;

export default ShadowButton;
