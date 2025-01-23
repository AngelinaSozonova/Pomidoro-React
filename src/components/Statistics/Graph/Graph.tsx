import {
  ActiveElement,
  BarElement,
  CategoryScale,
  ChartEvent,
  Chart as ChartJS,
  ChartOptions,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  convertSecondsToHMS,
  formatTime,
} from "../../../helpers/convertSecondsToHMS";
import { sortDate } from "../../../helpers/sortDate";
import { useContext, useEffect } from "react";
import { statisticsContext } from "../../../context/statisticsContext";
import * as s from "./style";
import { themeContext } from "../../../context/themeContext";
import { ThemeType } from "src/types.global";
import { colors } from "src/constants/colors";

export type weekType = "currentWeek" | "lastWeek" | "twoLastWeek";

interface IGraph {
  currentDay?: number | null;
  setCurrentDay?: (state: number) => void;
  labels?: string[];
  data?: IData[];
  week?: weekType;
}

export interface IData {
  allPomidiro: number;
  countStop: number;
  date: string;
  focus: number;
  timeAll: number;
  timePause: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const labelsInitial = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const backgroundInitial = [
  "#EA8A79",
  "#EA8A79",
  "#EA8A79",
  "#EA8A79",
  "#EA8A79",
  "#EA8A79",
  "#EA8A79",
];

const getArrayBackgroundColor = (
  day: number,
  labels: string[],
  isTicks: boolean = false,
  theme?: ThemeType,
  dataArr?: number[],
) => {
  return labels.map((_, index) => {
    if (!isTicks) {
      if (index + 1 !== day) {
        if (dataArr && dataArr[index] === 0) {
          return theme && theme === 'light' ? `${colors.dustyGray}` : `${colors.white}`;
        }
        if (index === 6 && day === 0) {
          return `${colors.punch}`;
        }
        return `${colors.apricot}`;
      } else return `${colors.punch}`;
    } else {
      if (index + 1 !== day) {
        if (index === 6 && day === 0) {
          return `${colors.punch}`;
        }
        return theme && theme === 'light' ? `${colors.dustyGray}` : `${colors.white}`;
      } else return `${colors.punch}`;
    }
  });
};

const getDatesForLastThreeWeeks = (data: IData[], week: weekType) => {
  const today = new Date();
  const currentWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const lastWeekStart = new Date(
    currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  if (week === "currentWeek") {
    const currentWeekDates: IData[] = [];

    data.forEach((item) => {
      const date = new Date(item.date);
      if (
        date >= currentWeekStart &&
        date < new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
      ) {
        currentWeekDates.push(item);
      }
    });

    return currentWeekDates;
  } else if (week === "lastWeek") {
    const lastWeekDates: IData[] = [];

    data.forEach((item) => {
      const date = new Date(item.date);
      if (
        date >= lastWeekStart &&
        date < new Date(lastWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
      ) {
        lastWeekDates.push(item);
      }
    });

    return lastWeekDates;
  } else if (week === "twoLastWeek") {
    const twoWeeksAgoStart = new Date(
      lastWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const twoWeeksAgoDates: IData[] = [];

    data.forEach((item) => {
      const date = new Date(item.date);
      if (
        date >= twoWeeksAgoStart &&
        date < new Date(twoWeeksAgoStart.getTime() + 7 * 24 * 60 * 60 * 1000)
      ) {
        twoWeeksAgoDates.push(item);
      }
    });

    return twoWeeksAgoDates;
  }
};

const Graph = ({
  currentDay,
  setCurrentDay,
  labels = labelsInitial,
  data,
  week,
}: IGraph) => {
  const theme = useContext(themeContext);

  const { setAllPomidoro, setCountStop, setFocus, setTimeAll, setTimePause } =
    useContext(statisticsContext);
  const newData = data && week && getDatesForLastThreeWeeks(data, week);
  const sortNewData = newData && sortDate(newData);

  const getData = () => {
    if (newData) {
      const arr = [0, 0, 0, 0, 0, 0, 0];

      sortNewData?.forEach((data) => {
        if (data?.date && data?.timeAll) {
          const day = new Date(data.date).getDay() - 1;

          if (day !== undefined) {
            arr[day] = data.timeAll;
          }
        }
      });

      return arr;
    }
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 24,
          },
          color:
            currentDay !== undefined && currentDay !== null
              ? getArrayBackgroundColor(currentDay, labels, true, theme)
              : [],
        },
        border: {
          display: false,
        },
      },
      y: {
        position: "right",
        ticks: {
          font: {
            size: 12,
          },
          color: theme && theme === 'light' ? `${colors.mineShaft}` : `${colors.white}`,
          callback: (label: string | number) => {
            const { hours, minutes, remainingSeconds } =
              convertSecondsToHMS(label as number);
            return formatTime(hours, minutes, remainingSeconds, "short");
          },
        },
        border: {
          display: false,
        },
      },
    },

    onClick: function (_event: ChartEvent, elements: ActiveElement[]) {
      const index = elements[0]?.index;
      const serachData = sortNewData?.find(
        (data) => new Date(data?.date).getDay() - 1 === index
      );

      if (index !== undefined) {
        if (serachData) {
          setAllPomidoro && setAllPomidoro(serachData?.allPomidiro);
          setCountStop && setCountStop(serachData?.countStop);
          setFocus && setFocus(serachData?.focus);
          setTimeAll && setTimeAll(serachData?.timeAll);
          setTimePause && setTimePause(serachData?.timePause);
          setCurrentDay && setCurrentDay(new Date(serachData?.date).getDay());
        } else {
          setAllPomidoro && setAllPomidoro(0);
          setCountStop && setCountStop(0);
          setFocus && setFocus(0);
          setTimeAll && setTimeAll(0);
          setTimePause && setTimePause(0);
          setCurrentDay && setCurrentDay(index === 6 ? 0 : index + 1);
        }
      }
    },
  };

  const dataArr = getData();

  const arrBackgroundColor =
    currentDay !== undefined && currentDay !== null
      ? getArrayBackgroundColor(currentDay, labels, false, theme, dataArr)
      : backgroundInitial;

  const dataGraph = {
    labels,
    datasets: [
      {
        label: "Data",
        data: dataArr,
        backgroundColor: arrBackgroundColor || `${colors.apricot}`,
        borderWidth: 1,
        minBarLength: 7,
      },
    ],
  };

  useEffect(() => {
    const serachData = sortNewData?.find(
      (item) => new Date(item.date).getDay() === currentDay
    );

    if (serachData) {
      setAllPomidoro && setAllPomidoro(serachData?.allPomidiro);
      setCountStop && setCountStop(serachData?.countStop);
      setFocus && setFocus(serachData?.focus);
      setTimeAll && setTimeAll(serachData?.timeAll);
      setTimePause && setTimePause(serachData?.timePause);
      setCurrentDay && setCurrentDay(new Date(serachData?.date).getDay());
    } else {
      setAllPomidoro && setAllPomidoro(0);
      setCountStop && setCountStop(0);
      setFocus && setFocus(0);
      setTimeAll && setTimeAll(0);
      setTimePause && setTimePause(0);
    }
  }, [
    currentDay,
    setAllPomidoro,
    setCountStop,
    setCurrentDay,
    setFocus,
    setTimeAll,
    setTimePause,
    sortNewData,
  ]);

  return (
    <s.wrapGraph>
      <Bar options={options} data={dataGraph} />
    </s.wrapGraph>
  );
};

export default Graph;
