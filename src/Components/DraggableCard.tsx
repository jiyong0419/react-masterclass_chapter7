import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
  padding: 10px 10px;
  border-radius: 5px;
`;

interface IDaggableCard {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDaggableCard) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
