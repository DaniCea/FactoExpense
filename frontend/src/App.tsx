import { Routes, Route } from 'react-router'
import { SignInPage, SignUpPage, HomePage } from "./pages";

import AuthOutlet from './AuthOutlet'

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthOutlet fallbackPath={'/signin'} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<AuthOutlet fallbackPath={'/'} userMustBeAuthenticated={false} />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
