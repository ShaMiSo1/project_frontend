import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth"; // ✅ 인증 상태 관리 Hook 추가
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import RegisterFailure from "./pages/RegisterFailure";

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth(); // ✅ 인증 상태 가져오기

  if (isLoading) {
    return <div>로딩 중...</div>; // ✅ 인증 확인 중이면 로딩 표시
  }

  return (
    <Routes>
      {/* ✅ 인증된 사용자는 홈 화면 접근 가능, 아니면 로그인 페이지로 이동 */}
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/register-failure" element={<RegisterFailure />} />
    </Routes>
  );
};

export default AppRoutes;
