import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";  // ✅ api.js import 추가

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ✅ 기존 axios에서 api로 변경
      const response = await api.post("/auth/login", { email, password });

      // JWT 토큰 저장
      localStorage.setItem("token", response.data.accessToken);

      // 로그인 성공 후 홈으로 이동
      navigate("/");
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <label>이메일</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

        <label>비밀번호</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />

        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
