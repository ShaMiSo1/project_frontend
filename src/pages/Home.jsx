// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // 인증이 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // 사용자 정보 불러오기
  useEffect(() => {
    if (isAuthenticated) {
      api.get("/auth/me")
        .then((res) => {
          console.log("API 응답:", res.data);
          setUser(res.data);
        })
        .catch((err) => console.error("사용자 정보 불러오기 실패:", err));
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h1>홈 화면</h1>
      {user ? (
        <>
          {/* 사용자 이름 또는 이메일 표시 */}
          <p>사용자 이름: {user.username || user.email}</p>

          {/* 냉장고로 이동 버튼 */}
          <button onClick={() => navigate("/fridge")}>
            내 냉장고로 가기
          </button>

          {/* 로그아웃 버튼 */}
          <button onClick={logout}>
            로그아웃
          </button>
        </>
      ) : (
        <p>로그인 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Home;
