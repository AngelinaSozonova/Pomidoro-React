import { ISetting } from "src/types.global";
import { ITask } from "../types";
import TaskBlock from "./TaskBlock/TaskBlock";
import { instructions } from "./constants";
import * as s from "./style";

interface IInstructionsBlock {
  tasks: ITask[];
  setTasks: (state: ITask[] | ((prevState: ITask[]) => ITask[])) => void;
  settings: ISetting;
}

const InstructionsBlock = ({
  tasks,
  setTasks,
  settings,
}: IInstructionsBlock) => {
  return (
    <div style={{ marginRight: "16px" }}>
      <s.title>Ура! Теперь можно начать работать:</s.title>

      <s.instructionsList>
        {instructions.map((instruction, index) => {
          return (
            <s.instructionsItem key={index}>{instruction}</s.instructionsItem>
          );
        })}
      </s.instructionsList>

      <TaskBlock
        tasks={tasks}
        setTasks={setTasks}
        settings={settings}
      />
    </div>
  );
};

export default InstructionsBlock;
