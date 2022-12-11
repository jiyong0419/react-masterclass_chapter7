import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCard from "./Components/DraggableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;
const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 30px 10px 20px 10px;
  box-flex-group: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    setToDos((currentToDos) => {
      const toDosCopy = [...currentToDos];
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination?.index, 0, draggableId);
      return toDosCopy;
    });
  };
  return (
    <Wrapper>
      <Boards>
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <DraggableCard
                      key={toDo}
                      toDo={toDo}
                      index={index}
                    ></DraggableCard>
                  ))}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </Boards>
    </Wrapper>
  );
}

export default App;
