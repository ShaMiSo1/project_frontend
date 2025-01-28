import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";  // ✅ api.js import 추가

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // ✅ 기존 axios에서 api로 변경
      const response = await api.post("/users/register", { username, email, password });

      // 성공하면 RegisterSuccess 페이지로 메시지 전달
      navigate("/register-success", { state: { message: response.data.message } });
    } catch (error) {
      // 실패하면 RegisterFailure 페이지로 메시지 전달
      navigate("/register-failure", { state: { message: error.response?.data?.message || "회원가입 실패" } });
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleRegister}>
        <label>사용자 이름:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />

        <label>이메일:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

        <label>비밀번호:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />

        <button type="submit">회원가입</button>
      </form>

      <p>이미 계정이 있으신가요? <a href="/login">로그인</a></p>
    </div>
  );
};

export default Register;
