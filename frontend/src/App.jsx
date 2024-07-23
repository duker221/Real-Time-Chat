/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/MainPage";
import NotFoundPage from "./components/NotFoundPage";
import Chat from "./components/Chat/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import { RegistrationPage } from "./components/Registration/Registration";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
      </Routes>
    </div>
    <ToastContainer />
  </Router>
);

export default App;
