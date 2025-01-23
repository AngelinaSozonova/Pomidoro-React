import { ReactNode } from 'react';

export type typeButton = "primary" | 'default';

interface IButton {
  type?: typeButton;
  children?: ReactNode;
}

const Button = ({ children }: IButton) => {
  return <button>{children}</button>;
};

export default Button;
