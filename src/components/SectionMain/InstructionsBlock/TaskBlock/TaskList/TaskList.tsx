import { useRef, useState } from "react";
import TaskItem from "./TaskItem/TaskItem";
import * as s from "./style";
import * as styleGlobal from "../../../../../style.global";
import Modal from "../../../../../ui-components/Modal/Modal";
import { deleteData } from "../../../../../helpers/IndexDB/deleteData";
import { editData } from "../../../../../helpers/IndexDB/editData";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ITask } from "src/components/SectionMain/types";
import { getTimeSettings } from "src/helpers/getTimeSettings";
import { ISetting } from "src/types.global";

interface ITaskList {
  tasks: ITask[];
  setTasks: (state: ITask[] | ((prevState: ITask[]) => ITask[])) => void;
  settings: ISetting;
  editKeyTask?: React.Key | null;
  setEditKeyTask?: (state: React.Key | null) => void;
}

export type CommandType = "increase" | "decrease" | "edit" | "delete";

const TaskList = ({
  tasks,
  setTasks,
  editKeyTask,
  setEditKeyTask,
  settings,
}: ITaskList) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [keyDeleteTask, setKeyDeleteTask] = useState<React.Key | null>(null);

  const nodeRef = useRef(null);

  const onSelectCommand = (keyTask: React.Key, nameCommand: CommandType) => {
    if (nameCommand === "increase") {
      const copyTasks = [...tasks];
      const task = copyTasks.find((item) => item.key === keyTask);

      if (task) {
        task.quantityPomidoro += 1;
        task.time += getTimeSettings(settings?.timePomidoro);
        editData("tasks", task);
      }

      setTasks(copyTasks);
    } else if (nameCommand === "decrease") {
      const copyTasks = [...tasks];
      const task = copyTasks.find((item) => item.key === keyTask);

      if (task) {
        if (task?.quantityPomidoro !== 1) {
          task.quantityPomidoro -= 1;
          task.time -= getTimeSettings(settings?.timePomidoro);
        }

        editData("tasks", task);
      }

      setTasks(copyTasks);
    } else if (nameCommand === "delete") {
      setIsOpenModal(true);
      setKeyDeleteTask(keyTask);
    } else if (nameCommand === "edit") {
      setEditKeyTask && setEditKeyTask(keyTask);
    }
  };

  const saveEdit = (newValue: string) => {
    if (editKeyTask) {
      const copyTasks = [...tasks];
      const serachTask = copyTasks.find((task) => task.key === editKeyTask);

      if (serachTask) {
        serachTask.name = newValue;
        editData("tasks", serachTask);
      }

      setTasks(copyTasks);
      setEditKeyTask && setEditKeyTask(null);
    }
  };

  const handleDeleteTask = () => {
    if (keyDeleteTask) {
      deleteData("tasks", keyDeleteTask as string);
      setTasks((state: ITask[]) =>
        state.filter((item) => item.key !== keyDeleteTask)
      );
    }

    setIsOpenModal(false);
  };

  return (
    <>
      <s.list>
        <TransitionGroup className="list">
          {tasks.map((item) => {
            return (
              <CSSTransition key={item.key} timeout={300} classNames="item" nodeRef={nodeRef}>
                <TaskItem
                  keyTask={item.key}
                  name={item.name}
                  quantityPomidoro={item.quantityPomidoro}
                  onSelectCommand={onSelectCommand}
                  editKeyTask={editKeyTask}
                  saveEdit={saveEdit}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </s.list>

      <Modal
        open={isOpenModal}
        setOpen={setIsOpenModal}
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "25px",
          maxWidth: "350px",
        }}
        footer={null}
      >
        <s.textDeleteTask>Удалить задачу?</s.textDeleteTask>
        <s.blockButtons>
          <styleGlobal.buttonPrimary $canel $mb="10" onClick={handleDeleteTask}>
            Удалить
          </styleGlobal.buttonPrimary>
          <s.buttonCanel onClick={() => setIsOpenModal(false)}>
            Отмена
          </s.buttonCanel>
        </s.blockButtons>
      </Modal>
    </>
  );
};

export default TaskList;
