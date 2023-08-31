import { styled } from 'styled-components';

export interface IButtonProps {
  width: 'half' | 'full';
  event: () => void;
  text: string;
  style: 'default' | 'desactive' | 'transparent';
  disabled?: boolean;
}

export interface IButtonStyleProps {
  width: 'half' | 'full';
  colors: {
    backgroundColor?: string;
    color?: string;
    border?: string;
    hoverColor?: string;
  };
}

export default function PlainButton({
  width,
  event,
  text,
  style,
  disabled,
}: IButtonProps) {
  return (
    <Button
      width={width}
      onClick={event}
      colors={BUTTON_STYLES[style]}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}

const Button = styled.button<IButtonStyleProps>`
  width: ${(props) => (props.width === 'half' ? '48.5%' : '100%')};
  height: 50px;
  border-radius: 8px;
  background-color: ${(props) => props.colors.backgroundColor};
  color: ${(props) => props.colors.color} !important;
  border: ${(props) => props.colors.border};
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.colors.hoverColor} !important;
  }
`;

const BUTTON_STYLES = {
  default: {
    backgroundColor: '#b4f3a8',
    color: '#000000',
    border: 'none',
    hoverColor: '#a8e09d',
  },
  desactive: {
    backgroundColor: '#f0f0f5',
    color: '#858899',
    border: 'none',
    hoverColor: '#e3e3ea',
  },
  transparent: {
    backgroundColor: 'transparent',
    color: '#525463',
    border: '1px solid #e1e2ea',
    hoverColor: '#e1e2ea',
  },
};
