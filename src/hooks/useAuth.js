import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

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
  }, []);

  return { isAuthenticated, setIsAuthenticated };
};

export default useAuth;
