import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { IToDo, FoodBoards } from "../atoms";
import { useSetRecoilState } from "recoil";

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  boardTitle: string;
  boardList: IToDo[];
}

interface IForm {
  food: string;
}

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

function Board({ boardTitle, boardList }: IBoardProps) {
  const setFoodBoards = useSetRecoilState(FoodBoards);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ food }: IForm) => {
    const newFood = {
      id: Date.now(),
      text: food,
    };
    setFoodBoards((foodBoards) => {
      return {
        ...foodBoards,
        [boardTitle]: [...foodBoards[boardTitle], newFood],
      };
    });
    setValue("food", "");
  };
  return (
    <Wrapper>
      <Title>{boardTitle}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("food", { required: true })}
          type="text"
          placeholder={`Add task on food`}
        />
      </Form>
      <Droppable droppableId={boardTitle}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {boardList.map((food, index) => (
              <DraggableCard
                key={food.id}
                foodId={food.id}
                foodText={food.text}
                index={index}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
