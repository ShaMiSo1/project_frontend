// src/pages/FridgeManagementPage.jsx
import React, { useState } from "react";
import api from "../services/api";

/**
 * FridgeManagementPage
 * - 냉장고에 있는 재료를 추가/삭제할 수 있는 페이지
 * - 재료 검색을 통해 Spoonacular API를 사용하여 재료 추가
 */
const FridgeManagementPage = ({ ingredients, onChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // 재료 삭제 핸들러
  const handleDelete = async (id) => {
    try {
      await api.delete(`/fridge/${id}`);
      onChange(); // 냉장고 목록 갱신
    } catch (err) {
      console.error("재료 삭제 실패:", err);
    }
  };

  // 재료 검색 핸들러
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      // 백엔드 프록시 엔드포인트를 통해 Spoonacular API 호출
      const res = await api.get(`/spoonacular/search?query=${encodeURIComponent(searchQuery)}`);
      // SpoonacularService가 IngredientDetails를 반환하므로, imageUrl 필드를 포함
      setSearchResults(res.data); // [{ name, imageUrl }, ...]
    } catch (err) {
      console.error("재료 검색 실패:", err);
    }
  };

  // 검색 결과에서 재료 추가 핸들러
  const handleAddFromSearch = async (item) => {
    try {
      await api.post("/fridge/add", {
        ingredientName: item.name,
        quantity: 1,
        imageUrl: item.imageUrl // 백엔드에서 제공한 이미지 URL 사용
      });
      onChange(); // 냉장고 목록 갱신
      setSearchResults([]); // 검색 결과 초기화
      setSearchQuery("");    // 검색창 초기화
    } catch (err) {
      console.error("재료 추가 실패:", err);
    }
  };

  return (
    <div>
      <h2>내 냉장고 관리</h2>

      {/* 현재 냉장고 재료 목록 */}
      <ul>
        {ingredients.map((ing) => (
          <li key={ing.id} style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
            <img
              src={ing.imageUrl || "https://via.placeholder.com/30"}
              alt={ing.ingredientName}
              style={{ width: "30px", height: "30px", marginRight: "8px" }}
            />
            <span>{ing.ingredientName} x {ing.quantity}</span>
            <button onClick={() => handleDelete(ing.id)} style={{ marginLeft: "auto" }}>
              삭제
            </button>
          </li>
        ))}
      </ul>

      <hr />

      {/* 재료 검색 섹션 */}
      <div>
        <h3>재료 검색 및 추가</h3>
        <input
          type="text"
          placeholder="재료 검색 (예: onion)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "200px", marginRight: "8px" }}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {/* 검색 결과 표시 */}
      <div style={{ marginTop: "16px" }}>
        {searchResults.length > 0 && (
          <>
            <h4>검색 결과:</h4>
            <ul>
              {searchResults.map((item, index) => (
                <li key={index} style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: "30px", height: "30px", marginRight: "8px" }}
                  />
                  <span>{item.name}</span>
                  <button onClick={() => handleAddFromSearch(item)} style={{ marginLeft: "auto" }}>
                    추가
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default FridgeManagementPage;
