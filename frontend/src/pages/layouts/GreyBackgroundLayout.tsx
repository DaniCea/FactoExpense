import { ReactNode } from "react";

import { Navbar } from "../../components/common";

interface ILayoutProps {
  children: ReactNode;
  withNavbar?: boolean;
}

export default function GreyBakgroundLayout({ children, withNavbar }: ILayoutProps) {
  return (
    <section className={"bg-gray-50 dark:bg-gray-900" + (withNavbar ? " h-screen" : "")}>
      { withNavbar && ( <Navbar /> ) }
      <div className={"px-6 py-8 mx-auto" + (withNavbar ? "" : " h-screen ")}>
        { children }
      </div>
    </section>
  )
}