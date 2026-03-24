import { ReactNode } from "react";
import { AuthContextProvider } from "./_utils/auth-context";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default Layout;