import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegisterSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || "회원가입이 완료되었습니다. 이메일을 확인하세요.";

  return (
    <div>
      <h1>회원가입 성공</h1>
      <p>{message}</p>
      <p>이메일 인증을 완료한 뒤 로그인을 진행해주세요.</p>

      <button onClick={() => navigate("/login")}>
        로그인 화면으로 돌아가기
      </button>
    </div>
  );
};

export default RegisterSuccess;
