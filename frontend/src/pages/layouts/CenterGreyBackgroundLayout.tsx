import { ReactNode } from "react";
import { NavBar } from "../../components";

interface ILayoutProps {
  children: ReactNode
  withNavbar?: boolean;
  verticalCenter?: boolean;
}

export default function CenterGreyBackgroundLayout({ children, withNavbar, verticalCenter }: ILayoutProps) {
  return (
    <section className={"bg-gray-50 dark:bg-gray-900" + (withNavbar ? " h-screen" : "")}>
      { withNavbar && ( <NavBar /> ) }
      <div className={"flex flex-col items-center px-6 py-8 mx-auto"+ (withNavbar ? "" : " h-screen ") + (verticalCenter ? " justify-center" : "")}>
        <div className={"w-full overflow-y-auto max-h-[85vh] bg-white rounded-lg shadow dark:border md:mt-0 md:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700"}>
          <div className="space-y-6 p-8">
            { children }
          </div>
        </div>
      </div>
    </section>
  );
}