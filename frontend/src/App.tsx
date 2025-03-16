import { Routes, Route } from 'react-router'
import { SignInPage, SignUpPage, HomePage } from "./pages";

import AuthOutlet from './AuthOutlet'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<AuthOutlet fallbackPath={'/signin'} />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
