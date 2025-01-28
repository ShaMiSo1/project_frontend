import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ api.js에서 Axios 인스턴스 가져오기
import useAuth from "../hooks/useAuth"; // ✅ useAuth 추가

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // ✅ 인증 상태 및 로그아웃 함수 사용

  // ✅ 인증되지 않은 경우 로그인 페이지로 이동
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // ✅ 로그인된 사용자 정보를 가져오기
  useEffect(() => {
    api.get("/auth/me") // ✅ 백엔드 API 호출
      .then((res) => {
        console.log("API 응답:", res.data);
        setUser(res.data);
      })
      .catch((err) => console.error("사용자 정보 불러오기 실패:", err));
  }, []);

  return (
    <div>
      <h1>홈 화면</h1>
      {user ? (
        <>
          <p>사용자 이름: {user.username}</p>
          <p>사용자 권한: {user.roles?.join(", ")}</p>
          <button onClick={logout}>로그아웃</button> {/* ✅ useAuth의 logout 함수 사용 */}
        </>
      ) : (
        <p>로그인 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Home;
