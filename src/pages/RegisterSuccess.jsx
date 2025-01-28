// RegisterSuccess.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const RegisterSuccess = () => {
  const location = useLocation();
  const message = location.state?.message || "회원가입 성공";

  return (
    <div>
      <h1>회원가입 성공</h1>
      <p>{message}</p>
      <Link to="/login">로그인 페이지로 이동</Link>
    </div>
  );
};

export default RegisterSuccess;
