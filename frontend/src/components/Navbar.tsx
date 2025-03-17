import { useNavigate } from "react-router";
import useSignOut from 'react-auth-kit/hooks/useSignOut';

export default function NavBar(){
  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleLogOut = () => {
    signOut()
    navigate('/signin')
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-lg font-bold text-gray-900 dark:text-white">FactoExpense</a>
        </div>
        <div className="hidden w-full md:flex md:w-auto ml-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-cyan-600 rounded-sm md:bg-transparent md:text-cyan-600 md:p-0 dark:text-white md:dark:text-cyan-500"
                aria-current="page"
                onClick={handleLogOut}
              >
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

}