import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/MainPage";
import NotFoundPage from "./components/NotFoundPage";
import Chat from "./components/Chat/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
