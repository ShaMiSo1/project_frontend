// src/pages/FridgeIntroPage.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

/**
 * FridgeIntroPage
 * - ChatGPT가 추천한 재료 목록을 드래그 앤 드롭으로 냉장고에 추가
 * - 재료 추가 시 onAdded 콜백을 호출하여 냉장고 목록 갱신
 */
const FridgeIntroPage = ({ onAdded }) => {
  const [recommended, setRecommended] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // 추가 중 상태

  useEffect(() => {
    fetchRecommendedIngredients();
  }, []);

  // ChatGPT API를 통해 추천 재료 목록 가져오기
  const fetchRecommendedIngredients = async () => {
    try {
      const res = await api.get("/ingredients/recommend");
      // res.data는 [{ name: "김치", imageUrl: "..." }, ...]
      setRecommended(res.data);
    } catch (err) {
      console.error("추천 재료 목록 불러오기 실패:", err);
    }
  };

  // Drag & Drop 종료 시 호출되는 핸들러
  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; // 드롭 위치가 유효하지 않음

    // source와 destination을 확인하여 필요한 동작 수행
    if (
      source.droppableId === "recommended" &&
      destination.droppableId === "myFridge"
    ) {
      const ingredientName = draggableId;

      // 추천 리스트에서 해당 재료 찾기
      const ingredient = recommended.find(item => item.name === ingredientName);
      if (!ingredient) return;

      try {
        // 백엔드에 재료 추가 요청 (IngredientDto 형식)
        await api.post("/fridge/add", {
          ingredientName: ingredient.name,
          quantity: 1, // 기본 수량 1
          imageUrl: ingredient.imageUrl // 실제 이미지 URL 사용
        });
        setIsAdding(true); // 추가 중 상태 설정

        // 냉장고 목록 갱신
        onAdded();

        // 추가 중 상태를 잠시 표시 후 초기화
        setTimeout(() => {
          setIsAdding(false);
        }, 1000); // 1초 지연
      } catch (err) {
        console.error("재료 추가 실패:", err);
      }
    }
  };

  return (
    <div>
      <h2>처음 냉장고 설정</h2>
      <p>추천 재료 목록을 드래그하여 냉장고에 추가해보세요.</p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "2rem" }}>
          {/* 왼쪽: 추천 재료 목록 */}
          <Droppable droppableId="recommended">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: "250px",
                  minHeight: "300px",
                  border: "2px solid #ccc",
                  padding: "8px",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9"
                }}
              >
                <h3>추천 재료 (ChatGPT)</h3>
                {recommended.map((ingredient, index) => (
                  <Draggable
                    key={ingredient.name} // 고유 키 사용
                    draggableId={ingredient.name} // 고유한 재료 이름 사용
                    index={index}
                  >
                    {(provided2) => (
                      <div
                        ref={provided2.innerRef}
                        {...provided2.draggableProps}
                        {...provided2.dragHandleProps}
                        style={{
                          marginBottom: "8px",
                          padding: "8px",
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "grab",
                          ...provided2.draggableProps.style
                        }}
                      >
                        {/* 실제 이미지 URL 사용 */}
                        <img
                          src={ingredient.imageUrl}
                          alt={ingredient.name}
                          style={{ width: "30px", height: "30px", marginRight: "8px" }}
                        />
                        <span>{ingredient.name}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* 오른쪽: 내 냉장고 드롭존 */}
          <Droppable droppableId="myFridge">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: "250px",
                  minHeight: "300px",
                  border: "2px solid #007bff",
                  padding: "8px",
                  borderRadius: "8px",
                  backgroundColor: "#e6f7ff"
                }}
              >
                <h3>나의 냉장고</h3>
                <p>(여기에 드롭하세요)</p>
                {isAdding && <p>재료가 추가되었습니다!</p>} {/* 추가 중 메시지 */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default FridgeIntroPage;
