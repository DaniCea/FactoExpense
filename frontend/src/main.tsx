import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

import Router from './router/Router'

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: true
});

createRoot(document.getElementById('root')!).render(
  <AuthProvider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </AuthProvider>
)
