import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    // 같은 보드 내에서 드래그가 발생시
    if (destination?.droppableId === source.droppableId) {
      setToDos((toDos) => {
        const boardCopy = [...toDos[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return {
          ...toDos,
          [source.droppableId]: boardCopy,
        };
      });
    }
    // 다른 보드로 드래그 이동시
    if (destination.droppableId !== source.droppableId) {
      setToDos((toDos) => {
        const sourceBoard = [...toDos[source.droppableId]];
        const destinationBoard = [...toDos[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableId);
        return {
          ...toDos,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((toDo) => (
            <Board key={toDo} toDoKey={toDo} toDoValue={toDos[toDo]}></Board>
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
