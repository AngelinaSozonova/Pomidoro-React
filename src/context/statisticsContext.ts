import { createContext } from "react";

interface IstatisticsContext {
  focus: number;
  pauseTime: number;
  stops: number;
  allPomidiro: number;
  timeAll: number;
  setTimePause?: (value: number | ((prev: number) => number)) => void;
  setFocus?: (value: number | ((prev: number) => number)) => void;
  setCountStop?: (value: number | ((prev: number) => number)) => void;
  setAllPomidoro?: (value: number | ((prev: number) => number)) => void;
  setTimeAll?: (value: number | ((prev: number) => number)) => void;
}

export const statisticsContext = createContext<IstatisticsContext>({
  focus: 0,
  pauseTime: 0,
  stops: 0,
  allPomidiro: 0,
  timeAll: 0,
});
