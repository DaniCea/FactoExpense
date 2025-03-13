import { useState, useEffect } from 'react';
import { fetchTenants } from "./api";
import SignInPage from "./pages/SignInPage";

function App() {
  const [count, setCount] = useState(0)

  useEffect(() =>{
    fetchTenants().then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  })

  return (
    <>
      <SignInPage />
    </>
  )
}

export default App
