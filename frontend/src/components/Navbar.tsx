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
      <div className="flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-4 ml-5">
          <a href="/" className="text-lg font-bold text-gray-900 dark:text-white">FactoExpense</a>
        </div>
        <div className="font-semibold mr-5">
          <a
            href="#"
            className="block py-2 px-3 text-cyan-600"
            aria-current="page"
            onClick={handleLogOut}
          >
            Log out
          </a>
        </div>
      </div>
    </nav>
  );

}