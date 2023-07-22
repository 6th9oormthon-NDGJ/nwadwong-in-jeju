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
  box-shadow: 0px 0px 13px -4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
`;

export default ShadowButton;
