// 파일명: hooks/useAuth.jsx
import React, {
  createContext,
  useEffect,
  useState,
  useContext
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 새로고침 or 첫 진입 시 localStorage의 토큰 체크
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      // 토큰이 있으면 백엔드에 /auth/me 요청해서 유효 여부 체크
      const checkAuthStatus = async () => {
        try {
          const response = await api.get("/auth/me");
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("❌ 인증 상태 확인 실패:", error);
          setIsAuthenticated(false);
        }
      };
      checkAuthStatus();
    }
  }, []);

  // 로그아웃 처리
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 실제 컴포넌트에서 useAuth()로 호출해서 사용
export const useAuth = () => {
  return useContext(AuthContext);
};
