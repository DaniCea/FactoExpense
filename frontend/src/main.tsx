import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import './index.css'
import App from './App'

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: true
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
