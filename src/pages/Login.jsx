import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  // 필요하다면 useAuth()를 통해 전역 상태 제어 가능

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      // ★ 여기서 "token" 필드 사용 (백엔드에서 내려주는 필드명)
      localStorage.setItem("token", response.data.token);

      // 인증 상태 true로
      setIsAuthenticated(true);

      // 홈화면으로 이동
      navigate("/");
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <label>이메일</label><br/>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>

        <label>비밀번호</label><br/>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>

        <button type="submit">로그인</button>
      </form>
      <p>
        회원이 아니신가요? <a href="/register">회원가입</a>
      </p>
    </div>
  );
};

export default Login;
