import { Routes, Route } from 'react-router'
import { HomePage, AuthPage, NewExpensePage } from "./pages";

import AuthOutlet from './AuthOutlet'

function Router() {
  return (
    <>
      <Routes>
        <Route element={<AuthOutlet fallbackPath={'/signin'} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-expense" element={<NewExpensePage />} />
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
