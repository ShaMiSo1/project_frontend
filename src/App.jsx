import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import useAuth, { AuthProvider } from './hooks/useAuth'; // ✅ AuthProvider 추가
import Login from './pages/Login'; // ✅ 로그인 컴포넌트 추가
import './App.css';

function AppContent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // ✅ 인증 상태 가져오기

  // ✅ 로그인 상태 확인 후 로그인되지 않은 사용자는 로그인 페이지로 리디렉트
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // ✅ 인증된 사용자만 데이터 가져오기 실행
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/data"); // ✅ 백엔드 데이터 가져오기
          if (!response.ok) throw new Error("데이터 요청 실패");
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('❌ 데이터 불러오기 실패:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  // ✅ isAuthenticated가 null이면 로딩 화면 표시
  if (isAuthenticated === null) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <h1>방요 프로젝트 시작 🚀</h1>

      <div className="card">
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <div className="data-section">
        <h2>백엔드에서 가져온 데이터:</h2>
        {loading ? (
          <p>🔄 Loading...</p>
        ) : data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>⚠️ 데이터를 불러오는 데 실패했습니다.</p>
        )}
      </div>

      <p className="read-the-docs">
        Click on the button to increase the count!
      </p>
    </>
  );
}

// ✅ `AuthProvider`로 감싸서 `useAuth()`가 정상 동작하도록 변경
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
