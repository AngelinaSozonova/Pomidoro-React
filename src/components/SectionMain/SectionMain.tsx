import * as stylesGlobal from "../../style.global";
import * as s from "./style";
import InstructionsBlock from "./InstructionsBlock/InstructionsBlock";
import TimerBlock from "./TimerBlock/TimerBlock";
import { useContext, useEffect, useState } from "react";
import { getStoreData } from "../../helpers/IndexDB/getStoreData";
import { statisticsContext } from "../../context/statisticsContext";
import { addData } from "../../helpers/IndexDB/addDataIndexDB";
import Settings from "../Settings/Settings";
import { ISetting } from "src/types.global";
import { ITask } from "./types";

const initialSettings = {
  timePomidoro: { min: "00", sec: "10" },
  timeShortBreak: { min: "00", sec: "05" },
  timeLongBreak: { min: "00", sec: "10" },
  frequencyLongBreak: 4,
  isNotifications: true,
};

const SectionMain = () => {
  const { allPomidiro, focus, pauseTime, stops, timeAll } =
    useContext(statisticsContext);
  const [isWriteIndexDB, setIsWriteIndexDB] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [settings, setSettings] = useState<ISetting>(initialSettings);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  useEffect(() => {
    const fn = async () => {
      getStoreData("tasks").then((items) => {
        if (items?.length) {
          setTasks(items as ITask[]);
        }
      });
    };

    fn();
  }, []);

  useEffect(() => {
    if (!isWriteIndexDB) {
      const currentDate = new Date().toISOString().split("T")[0];

      addData("statistics", {
        date: currentDate,
        timePause: pauseTime,
        focus: focus,
        countStop: stops,
        allPomidiro: allPomidiro,
        timeAll: timeAll,
      });
    } else {
      setIsWriteIndexDB(false);
    }
  }, [allPomidiro, focus, isWriteIndexDB, pauseTime, stops, timeAll]);

  return (
    <s.main>
      <stylesGlobal.container $flex>
        <InstructionsBlock
          tasks={tasks}
          setTasks={setTasks}
          settings={settings}
        />
        {tasks?.length > 0 && (
          <TimerBlock
            tasks={tasks}
            setTasks={setTasks}
            settings={settings}
          />
        )}

        <s.buttonSettings onClick={() => setIsOpenSettings(!isOpenSettings)}>
          <s.svg />
        </s.buttonSettings>

        {isOpenSettings && (
          <Settings
            settings={settings}
            setSettings={setSettings}
            isOpen={isOpenSettings}
            setIsOpen={setIsOpenSettings}
          />
        )}
      </stylesGlobal.container>
    </s.main>
  );
};

export default SectionMain;
