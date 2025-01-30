// src/pages/MyFridge.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

const MyFridge = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchIngredients();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // 재료 목록 조회 핸들러
  const fetchIngredients = async () => {
    try {
      const response = await api.get('/fridge');
      setIngredients(response.data);
    } catch (err) {
      console.error('재료 목록 조회 실패:', err);
    }
  };

  // 재료 추가 핸들러
  const handleAddIngredient = async () => {
    if (newIngredient.trim()) {
      try {
        // 백엔드 API 연동: POST /api/fridge/add
        const response = await api.post('/fridge/add', {
          ingredientName: newIngredient.trim(),
          imageUrl: '', // 이미지 URL은 후에 업데이트하거나 Spoonacular을 통해 가져올 수 있음
          quantity: 1, // 기본 수량 설정
        });

        // 서버에서 반환한 메시지에 따라 재료 목록을 다시 가져옵니다
        fetchIngredients();
        setNewIngredient('');
      } catch (err) {
        console.error('재료 추가 실패:', err);
      }
    }
  };

  // 재료 삭제 핸들러
  const handleDeleteIngredient = async (id) => {
    try {
      // 백엔드 API 연동: DELETE /api/fridge/{ingredientId}
      await api.delete(`/fridge/${id}`);
      setIngredients(ingredients.filter((item) => item.id !== id));
    } catch (err) {
      console.error('재료 삭제 실패:', err);
    }
  };

  return (
    <div className="myfridge-container">
      <h2>나의 냉장고 🧺</h2>
      <div className="ingredient-input">
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="재료를 입력하세요 (예: 당근)"
        />
        <button onClick={handleAddIngredient}>추가</button>
      </div>

      <ul className="ingredient-list">
        {ingredients.map((item) => (
          <li key={item.id}>
            {item.ingredientName}
            <button
              onClick={() => handleDeleteIngredient(item.id)}
              className="delete-btn"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(-1)} className="back-btn">
        뒤로 가기
      </button>
    </div>
  );
};

export default MyFridge;
