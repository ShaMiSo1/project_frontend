import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegisterFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || "이미 존재하는 사용자 이름이거나 이메일입니다.";

  return (
    <div>
      <h1>회원가입 실패</h1>
      <p>{message}</p>

      <button onClick={() => navigate("/register")}>
        다시 회원가입
      </button>
      <button onClick={() => navigate("/login")}>
        로그인 화면으로 이동
      </button>
    </div>
  );
};

export default RegisterFailure;
