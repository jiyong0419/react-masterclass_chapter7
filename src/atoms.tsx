import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IFoodBoards {
  [key: string]: IToDo[];
}
export const FoodBoards = atom<IFoodBoards>({
  key: "FoodBoards",
  default: {
    "좋아하는 음식": [],
    "싫어하는 음식": [],
  },
});
