import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Login from './components/MainPage';
import NotFoundPage from './components/NotFoundPage';
import Chat from './components/Chat/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import RegistrationPage from './components/Registration/Registration';
import routes from './routes';
import { ProfanityProvider } from './components/ProfanityContext';
import { initializeSocket } from './socketInit';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      initializeSocket(token);
    }

    return () => {};
  }, [token]);

  return (
    <ProfanityProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Routes>
            <Route
              path={routes.chat}
              element={(
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              )}
            />
            <Route path={routes.loginPage} element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path={routes.signUpPage} element={<RegistrationPage />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </ProfanityProvider>
  );
};

export default App;
