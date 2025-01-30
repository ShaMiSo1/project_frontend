// src/pages/FridgePage.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import FridgeIntroPage from "./FridgeIntroPage";
import FridgeManagementPage from "./FridgeManagementPage";

/**
 * FridgePage
 * - 냉장고가 비어있으면 FridgeIntroPage 렌더링
 * - 냉장고에 재료가 있으면 FridgeManagementPage 렌더링
 */
const FridgePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  // 페이지 로딩 시 냉장고 재료 조회
  useEffect(() => {
    fetchMyFridge();
  }, []);

  const fetchMyFridge = async () => {
    setLoading(true);
    try {
      const res = await api.get("/fridge");
      setIngredients(res.data);
    } catch (err) {
      console.error("냉장고 목록 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (ingredients.length === 0) {
    // 냉장고가 비어있으면 Intro 페이지
    return <FridgeIntroPage onAdded={fetchMyFridge} />;
  }

  // 냉장고에 재료가 있으면 관리 페이지
  return <FridgeManagementPage ingredients={ingredients} onChange={fetchMyFridge} />;
};

export default FridgePage;
