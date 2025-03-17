import { Routes, Route } from 'react-router'
import { HomePage } from "./pages";

import AuthOutlet from './AuthOutlet'
import AuthPage from "./pages/AuthPage";

function Router() {
  return (
    <>
      <Routes>
        <Route element={<AuthOutlet fallbackPath={'/signin'} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<AuthOutlet fallbackPath={'/'} userMustBeAuthenticated={false} />}>
          <Route path="/signin" element={<AuthPage type={'signin'} />} />
          <Route path="/signup" element={<AuthPage type={'signup'} />} />
        </Route>
      </Routes>
    </>
  )
}

export default Router
