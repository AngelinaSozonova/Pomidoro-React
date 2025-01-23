import { ISetting } from "src/types.global";

export type InputType =
  | "timePomidoroMin"
  | "timePomidoroSec"
  | "timeShortBreakMin"
  | "timeShortBreakSec"
  | "timeLongBreakMin"
  | "timeLongBreakSec"
  | "frequencyLongBreak";

export interface ISettings {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  settings?: ISetting;
  setSettings?: React.Dispatch<React.SetStateAction<ISetting>>;
}