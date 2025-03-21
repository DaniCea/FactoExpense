import { Routes, Route } from 'react-router'
import { HomePage, AuthPage, NewExpensePage } from "../pages";

import AuthOutlet from './AuthOutlet'

import { ROUTES } from "./routes";
import { AuthType } from "../pages/AuthPage";

function Router() {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<AuthOutlet fallbackPath={ROUTES.SIGNIN} />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.NEW_EXPENSE} element={<NewExpensePage />} />
      </Route>

      {/* Public Routes */}
      <Route element={<AuthOutlet fallbackPath={ROUTES.HOME} userMustBeAuthenticated={false} />}>
        <Route path={ROUTES.SIGNIN} element={<AuthPage type={AuthType.SIGNIN} />} />
        <Route path={ROUTES.SIGNUP} element={<AuthPage type={AuthType.SIGNUP} />} />
      </Route>
    </Routes>
  );
}

export default Router
