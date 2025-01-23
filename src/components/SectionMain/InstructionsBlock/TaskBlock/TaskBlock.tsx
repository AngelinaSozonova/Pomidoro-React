import * as s from "./style";
import * as styleGlobal from "../../../../style.global";
import TaskList from "./TaskList/TaskList";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { convertSecondsToHMS } from "../../../../helpers/convertSecondsToHMS";
import { addData } from "../../../../helpers/IndexDB/addDataIndexDB";
import { ITask } from "../../types";
import { ISetting } from "src/types.global";
import { getTimeSettings } from "src/helpers/getTimeSettings";

interface ITaskBlock {
  tasks: ITask[];
  setTasks: (state: ITask[] | ((prevState: ITask[]) => ITask[])) => void;
  settings: ISetting;
}

const TaskBlock = ({ tasks, setTasks, settings }: ITaskBlock) => {
  const [nameTask, setNameTask] = useState("");
  const [isErrorAddTask, setIsErrorAddTask] = useState(false);
  const [editKeyTask, setEditKeyTask] = useState<React.Key | null>(null);
  const [timeTasks, setTimeTasks] = useState(0);

  const timeConvert = convertSecondsToHMS(timeTasks);

  const addTask = () => {
    if (nameTask) {
      const newTask = {
        key: uuidv4(),
        name: nameTask,
        quantityPomidoro: 1,
        time: getTimeSettings(settings?.timePomidoro)
      };

      addData('tasks', newTask);
      setTasks((state) => [...state, newTask]);

      setNameTask("");
    } else setIsErrorAddTask(true);
  };

  const onChangeNameTask = (value: string) => {
    setNameTask(value);

    if (value) {
      setIsErrorAddTask(false);
    }
  };

  useEffect(() => {
    let sumTime = 0;
    tasks.forEach(
      (task) => (sumTime += task.time)
    );

    setTimeTasks(sumTime);
  }, [tasks])

  return (
    <>
      <s.block>
        {isErrorAddTask && <s.textError>Введите название задачи</s.textError>}
        <s.InputNameTask
          $error={isErrorAddTask}
          placeholder="Название задачи"
          onChange={(e) => onChangeNameTask(e.target.value)}
          value={nameTask}
        />
        <styleGlobal.buttonPrimary onClick={addTask}>
          Добавить
        </styleGlobal.buttonPrimary>
      </s.block>

      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        editKeyTask={editKeyTask}
        setEditKeyTask={setEditKeyTask}
        settings={settings}
      />

      <s.time>
        {timeConvert.hours !== 0 ? `${timeConvert.hours} ч ` : ""}
        {timeConvert.minutes !== 0 ? `${timeConvert.minutes} мин ` : ""}
        {timeConvert.remainingSeconds !== 0
          ? `${timeConvert.remainingSeconds} сек`
          : ""}
      </s.time>
    </>
  );
};

export default TaskBlock;
