import { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return <>{children}</>;
};

export default Layout;
