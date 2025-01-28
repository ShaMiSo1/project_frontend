// RegisterFailure.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const RegisterFailure = () => {
  const location = useLocation();
  const message = location.state?.message || "회원가입 실패";

  return (
    <div>
      <h1>회원가입 실패</h1>
      <p>{message}</p>
      <Link to="/register">다시 회원가입하기</Link>
    </div>
  );
};

export default RegisterFailure;
