import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

interface IDragabbleCardProps {
  foodId: number;
  foodText: string;
  index: number;
}

function DragabbleCard({ foodId, foodText, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={foodId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {foodText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
