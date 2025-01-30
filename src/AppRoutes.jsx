// src/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.jsx";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import RegisterFailure from "./pages/RegisterFailure";

// 냉장고 페이지 추가
import FridgePage from "./pages/FridgePage";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  // isAuthenticated가 null이면 아직 확인 중
  if (isAuthenticated === null) {
    return <div>로딩 중...</div>;
  }

  return (
    <Routes>
      {/* 인증이 필요한 라우트 */}
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />

      {/* /fridge 경로 추가 (인증 필요) */}
      <Route
        path="/fridge"
        element={isAuthenticated ? <FridgePage /> : <Navigate to="/login" />}
      />

      {/* 로그인 및 회원가입 라우트 */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" /> : <Register />}
      />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/register-failure" element={<RegisterFailure />} />

      {/* 기타 없는 페이지 → 홈으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
