import { ReactNode, useState } from "react";
import Dropdown from "../../../../../../ui-components/Dropdown/Dropdown";
import Decrease from "../../../../../Icons/Decrease";
import DeleteIcon from "../../../../../Icons/DeleteIcon";
import DropdownButtonIcon from "../../../../../Icons/DropdownButtonIcon";
import EditIcon from "../../../../../Icons/EditIcon";
import Increase from "../../../../../Icons/Increase";
import { CommandType } from "../TaskList";
import * as s from "./style";
import DisabledDecrease from "../../../../../Icons/DisabledDecrease";

interface ITaskItem {
  keyTask: React.Key;
  name: string;
  quantityPomidoro: number;
  saveEdit?: (newValue: string) => void;
  editKeyTask?: React.Key | null;
  onSelectCommand?: (keyTask: React.Key, nameCommand: CommandType) => void;
}

interface IDropdownItem {
  name: CommandType;
  label: string;
  icon: ReactNode;
}

const TaskItem = ({
  keyTask,
  name,
  quantityPomidoro,
  saveEdit,
  editKeyTask,
  onSelectCommand,
}: ITaskItem) => {
  const [valueNameTask, setValueNameTask] = useState(name);

  const dropdownList: IDropdownItem[] = [
    {
      name: "increase",
      label: "Увеличить",
      icon: <Increase />,
    },
    {
      name: "decrease",
      label: "Уменьшить",
      icon: quantityPomidoro === 1 ? <DisabledDecrease /> : <Decrease />,
    },
    {
      name: "edit",
      label: "Редактировать",
      icon: <EditIcon />,
    },
    {
      name: "delete",
      label: "Удалить",
      icon: <DeleteIcon />,
    },
  ];

  const onEditNameTask = (value: string) => {
    setValueNameTask(value);
  };

  return (
    <s.item>
      <s.info>
        <s.quantityPomidoro>{quantityPomidoro}</s.quantityPomidoro>
        {editKeyTask === keyTask ? (
          <s.inputEditNameTask
            value={valueNameTask}
            onChange={(e) => onEditNameTask(e.target.value)}
            onBlur={() => saveEdit && saveEdit(valueNameTask)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit && saveEdit(valueNameTask);
            }}
          />
        ) : (
          <s.nameTask>{name}</s.nameTask>
        )}
      </s.info>
      <Dropdown
        placement="center"
        button={
          <button>
            <DropdownButtonIcon />
          </button>
        }
      >
        <s.dropdownList>
          {dropdownList.map((item, index) => {
            return (
              <s.dropdownItem
                $disabled={quantityPomidoro === 1 && item.name === "decrease"}
                key={index}
                onClick={() =>
                  onSelectCommand && onSelectCommand(keyTask, item.name)
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "8px",
                  }}
                >
                  {item.icon}
                </div>
                <s.nameCommand>{item.label}</s.nameCommand>
              </s.dropdownItem>
            );
          })}
        </s.dropdownList>
      </Dropdown>
    </s.item>
  );
};

export default TaskItem;
