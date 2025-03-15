import { useEffect } from 'react';
import { Routes, Route } from 'react-router';

import { fetchTenants } from "./api";
import { SignInPage, SignUpPage, HomePage } from "./pages";

function App() {
  useEffect(() =>{
    fetchTenants().then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });
  })

  return (
    <>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
