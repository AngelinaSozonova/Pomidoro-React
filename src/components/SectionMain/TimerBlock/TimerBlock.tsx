import * as s from "./style";
import * as styleGlobal from "../../../style.global";
import { useCallback, useContext, useEffect, useState } from "react";
import { getPadTime } from "../../../helpers/getPadTime";
import { statisticsContext } from "../../../context/statisticsContext";
import HeaderTimer from "./HeaderTimer/HeaderTimer";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import sound from "src/assets/sound.wav";
import { getTimeSettings } from "src/helpers/getTimeSettings";
import { notificationContext } from "src/context/notificationContext";
import { deleteData } from "src/helpers/IndexDB/deleteData";
import AddTimeIcon from "src/components/Icons/AddTimeIcon";
import { ISetting } from "src/types.global";
import { ITask } from "../types";

interface ITimerBlock {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  settings?: ISetting;
}

const TimerBlock = ({
  tasks,
  setTasks,
  settings,
}: ITimerBlock) => {
  const {
    allPomidiro,
    timeAll,
    setAllPomidoro,
    setCountStop,
    setTimePause,
    setFocus,
    setTimeAll,
  } = useContext(statisticsContext);

  const { addNotificationFunc } = useContext(notificationContext);

  const [currentTask, setCurrentTask] = useState<ITask>(tasks[0] || {});
  const [currentPomidoro, setCurrentPomidoro] = useState(1);
  const [currentBreak, setCurrentBreak] = useState(1);

  const [time, setTime] = useState(
    (settings?.timePomidoro && getTimeSettings(settings?.timePomidoro)) || 10
  );
  const [isCount, setCount] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const minutes = Math.floor(time / 60);
  const formatMinutes = getPadTime(minutes);
  const sec = getPadTime(time - minutes * 60);

  const setTimeSetting = useCallback(() => {
    setTime(
      (settings?.timePomidoro && getTimeSettings(settings?.timePomidoro)) || 10
    );
  }, [settings?.timePomidoro]);

  const handleStart = () => {
    if (time === 0)
      setTime(
        (settings?.timeShortBreak &&
          getTimeSettings(settings?.timeShortBreak)) ||
          5
      );
    setCount(true);
  };

  const handleStop = () => {
    if (isCount) {
      setCount(false);
      setTimeSetting();
    }

    setCountStop && setCountStop((state) => state + 1);
  };

  const handlePause = () => {
    if (isCount) setCount(false);
    setIsPause(true);
    setCountStop && setCountStop((state) => state + 1);
  };

  const handleContinue = () => {
    setCount(true);
    setIsPause(false);
  };

  const handleOk = () => {
    if (!isBreak) {
      setIsBreak(true);
      setAllPomidoro && setAllPomidoro((state) => state + 1);
      setTime(() => {
        if (
          settings?.frequencyLongBreak &&
          (allPomidiro + 1) % settings?.frequencyLongBreak !== 0 &&
          allPomidiro + 1 !== 0
        )
          return getTimeSettings(settings?.timeShortBreak) || 5;

        return (
          (settings?.timeLongBreak &&
            getTimeSettings(settings?.timeLongBreak)) ||
          10
        );
      });
      setCount(true);
    }
  };

  // перейти к следующей задаче или помидору
  const handleSkip = useCallback(() => {
    setCurrentBreak((state) => state + 1);
    setCount(false);

    if (currentPomidoro !== currentTask.quantityPomidoro) {
      setCurrentPomidoro((state) => state + 1);
      setIsBreak(false);
      setTimeSetting();
      setIsPause(false);
    } else {
      // проверка на след задачу если нет, то вовзрат в начало остановка
      if (tasks[tasks.length - 1]?.key !== currentTask?.key) {
        const indexCurrentTask = tasks.findIndex(
          (item) => item.key === currentTask?.key
        );
        setTasks((state) =>
          state.filter((task) => task.key !== currentTask?.key)
        );
        deleteData("tasks", currentTask?.key);

        // переход к следующей задаче
        if (indexCurrentTask !== -1) {
          setCurrentTask(tasks[indexCurrentTask + 1]);
          setCurrentPomidoro(1);
          // сброс
          setIsBreak(false);
          setTimeSetting();
          setIsPause(false);
        }
      } else {
        setIsBreak(false);
        setIsPause(false);

        // удалить последнюю задачу
        setTasks((state) =>
          state.filter((task) => task.key !== currentTask?.key)
        );
        deleteData("tasks", currentTask?.key);
      }
    }
  }, [
    currentPomidoro,
    currentTask?.key,
    currentTask.quantityPomidoro,
    setTasks,
    setTimeSetting,
    tasks,
  ]);

  const addTime = () => {
    setTime((state) => state + 1 * 60);

    const copyTasks = [...tasks];
    const searchTask = copyTasks?.find((item) => item?.key === currentTask?.key);

    if (searchTask) {
      searchTask.time += 60;
    }

    setTasks(copyTasks);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCount) {
        setTime((state) => (state >= 1 ? state - 1 : 0));
      }

      !isBreak &&
        (isCount || isPause) &&
        setTimeAll &&
        setTimeAll((state) => state + 1);
    }, 1000);

    if (time === 0) {
      setCount(false);
      if (!isBreak) {
        setAllPomidoro &&
          setAllPomidoro((state) => {
            return state + 1;
          });
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isBreak, isCount, isPause, setAllPomidoro, setTimeAll, time]);

  // рассчет фокуса
  useEffect(() => {
    const workTime = allPomidiro * 10;
    const focus = Math.ceil((workTime / timeAll) * 100);

    if (focus) {
      setFocus && setFocus(focus);
    }
  }, [allPomidiro, setFocus, timeAll]);

  // таймер паузы
  useEffect(() => {
    const interval = setInterval(() => {
      isPause && setTimePause && setTimePause((state: number) => state + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPause, setTimePause]);

  useEffect(() => {
    const playSound = () => {
      new Audio(sound).play();
    };

    if (time === 0) {
      if (settings?.isNotifications) {
        addNotificationFunc({
          id: uuidv4(),
          status: "info",
          title: "Время таймера закончилось",
        });

        playSound();
      }

      if (!isBreak && tasks[tasks.length - 1]?.key !== currentTask?.key) {
        setIsBreak(true);

        setTime(() => {
          if (
            settings?.frequencyLongBreak &&
            (allPomidiro + 1) % settings?.frequencyLongBreak !== 0 &&
            allPomidiro + 1 !== 0
          )
            return getTimeSettings(settings?.timeShortBreak) || 5;

          return (
            (settings?.timeLongBreak &&
              getTimeSettings(settings?.timeLongBreak)) ||
            10
          );
        });

        setCount(true);
      } else {
        handleSkip();
      }
    }
  }, [
    addNotificationFunc,
    allPomidiro,
    currentTask?.key,
    handleSkip,
    isBreak,
    settings?.frequencyLongBreak,
    settings?.isNotifications,
    settings?.timeLongBreak,
    settings?.timeShortBreak,
    tasks,
    time,
  ]);

  useEffect(() => {
    setTimeSetting();
  }, [setTimeSetting]);

  return (
    <s.timerBlock>
      <HeaderTimer
        currentBreak={currentBreak}
        currentPomidoro={currentPomidoro}
        currentTask={currentTask}
        isBreak={isBreak}
        isCount={isCount}
        isPause={isPause}
      />
      <div>
        <s.blockTime>
          <CSSTransition in={isCount} timeout={500} classNames="times">
            <s.time $isCount={isCount || isPause} $isBreak={isBreak}>
              {formatMinutes}:{sec}
            </s.time>
          </CSSTransition>
          <s.buttonAddTime onClick={addTime}>
            <AddTimeIcon />
          </s.buttonAddTime>
        </s.blockTime>
        <s.blockCommands>
          {isCount ? (
            <styleGlobal.buttonPrimary $mr="25" onClick={handlePause}>
              Пауза
            </styleGlobal.buttonPrimary>
          ) : isPause ? (
            <styleGlobal.buttonPrimary $mr="25" onClick={handleContinue}>
              Продолжить
            </styleGlobal.buttonPrimary>
          ) : (
            <styleGlobal.buttonPrimary $mr="25" onClick={handleStart}>
              Старт
            </styleGlobal.buttonPrimary>
          )}

          {isPause && !isBreak ? (
            <styleGlobal.buttonDashed onClick={handleOk}>
              Сделано
            </styleGlobal.buttonDashed>
          ) : isBreak ? (
            <styleGlobal.buttonDashed onClick={handleSkip}>
              Пропустить
            </styleGlobal.buttonDashed>
          ) : (
            <styleGlobal.buttonDashed
              onClick={handleStop}
              $disabled={!isCount}
              disabled={!isCount}
            >
              Стоп
            </styleGlobal.buttonDashed>
          )}
        </s.blockCommands>
      </div>
    </s.timerBlock>
  );
};

export default TimerBlock;
