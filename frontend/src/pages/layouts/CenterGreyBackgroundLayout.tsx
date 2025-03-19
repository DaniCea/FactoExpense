import { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode
  centered?: boolean;
}

export default function CenterGreyBakgroundLayout({ children, centered }: ILayoutProps) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className={"flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0" + (centered && " justify-center")}>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            { children }
          </div>
        </div>
      </div>
    </section>
  );
}