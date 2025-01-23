import { useState } from "react";
import * as s from "./style";
import Modal from "../../ui-components/Modal/Modal";
import {  } from "../../App";
import { ITime } from "src/types.global";
import { ISettings, InputType } from "./types";

const initialTime = {
  min: "00",
  sec: "00",
};

const Settings = ({ isOpen, setIsOpen, settings, setSettings }: ISettings) => {
  const [timePomidoro, setTimePomidoro] = useState<ITime>(
    settings?.timePomidoro || initialTime
  );
  const [timeShortBreak, setTimeShortBreak] = useState<ITime>(
    settings?.timeShortBreak || initialTime
  );
  const [timeLongBreak, setTimeLongBreak] = useState<ITime>(
    settings?.timeLongBreak || initialTime
  );
  const [frequencyLongBreak, setFrequencyLongBreak] = useState(
    settings?.frequencyLongBreak || 4
  );
  const [isNotifications, setIsNotifications] = useState(
    settings?.isNotifications || false
  );

  const onChangeTime = (value: string, typeInput: InputType) => {
    const length = value.length;

    if (length <= 2) {
      if (typeInput === "timePomidoroMin") {
        setTimePomidoro((state) => ({
          ...state,
          min: value,
        }));
      } else if (typeInput === "timePomidoroSec") {
        setTimePomidoro((state) => ({
          ...state,
          sec: value,
        }));
      } else if (typeInput === "timeShortBreakMin") {
        setTimeShortBreak((state) => ({
          ...state,
          min: value,
        }));
      } else if (typeInput === "timeShortBreakSec") {
        setTimeShortBreak((state) => ({
          ...state,
          sec: value,
        }));
      } else if (typeInput === "timeLongBreakMin") {
        setTimeLongBreak((state) => ({
          ...state,
          min: value,
        }));
      } else if (typeInput === "timeLongBreakSec") {
        setTimeLongBreak((state) => ({
          ...state,
          sec: value,
        }));
      } else if (typeInput === "frequencyLongBreak") {
        setFrequencyLongBreak(Number(value));
      }
    }
  };

  const onSaveSettings = () => {
    setSettings &&
      setSettings({
        timePomidoro: timePomidoro,
        timeShortBreak: timeShortBreak,
        timeLongBreak: timeLongBreak,
        frequencyLongBreak: frequencyLongBreak,
        isNotifications: isNotifications,
      });
    setIsOpen(false);
  };

  const formatTime = (value: string, typeInput: InputType) => {
    if (value?.length === 1) {
      if (typeInput === "timePomidoroMin") {
        setTimePomidoro((state) => ({
          ...state,
          min: '0' + value,
        }));
      } else if (typeInput === "timePomidoroSec") {
        setTimePomidoro((state) => ({
          ...state,
          sec: '0' + value,
        }));
      } else if (typeInput === "timeShortBreakMin") {
        setTimeShortBreak((state) => ({
          ...state,
          min: '0' + value,
        }));
      } else if (typeInput === "timeShortBreakSec") {
        setTimeShortBreak((state) => ({
          ...state,
          sec: '0' + value,
        }));
      } else if (typeInput === "timeLongBreakMin") {
        setTimeLongBreak((state) => ({
          ...state,
          min: '0' + value,
        }));
      } else if (typeInput === "timeLongBreakSec") {
        setTimeLongBreak((state) => ({
          ...state,
          sec: '0' + value,
        }));
      }
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        setOpen={setIsOpen}
        title="Настройки"
        style={{ width: "800px" }}
        onOk={onSaveSettings}
      >
        <s.list>
          <s.item>
            <s.label>Продолжительность "помидора":</s.label>
            <div>
              <s.input
                type="number"
                onChange={(e) =>
                  onChangeTime(e.target.value, "timePomidoroMin")
                }
                onBlur={() => formatTime(timePomidoro.min, 'timePomidoroMin')}
                value={timePomidoro.min}
              />
              <s.time>мин.</s.time>
              <s.input
                type="number"
                onChange={(e) =>
                  onChangeTime(e.target.value, "timePomidoroSec")
                }
                onBlur={() => formatTime(timePomidoro.sec, 'timePomidoroSec')}
                value={timePomidoro.sec}
              />
              <span>сек.</span>
            </div>
          </s.item>
          <s.item>
            <s.label>Продолжительность короткого перерыва:</s.label>
            <div>
              <s.input
                type="number"
                onChange={(e) =>
                  onChangeTime(e.target.value, "timeShortBreakMin")
                }
                onBlur={() => formatTime(timeShortBreak.min, 'timeShortBreakMin')}
                value={timeShortBreak.min}
              />
              <s.time>мин.</s.time>
              <s.input
                type="number"
                onChange={(e) =>
                  onChangeTime(e.target.value, "timeShortBreakSec")
                }
                onBlur={() => formatTime(timeShortBreak.sec, 'timeShortBreakSec')}
                value={timeShortBreak.sec}
              />
              <span>сек.</span>
            </div>
          </s.item>
          <s.item>
            <s.label>Продолжительность длинного перерыва:</s.label>
            <div>
              <s.input
                type="number"
                onChange={(e) =>
                  onChangeTime(e.target.value, "timeLongBreakMin")
                }
                onBlur={() => formatTime(timeLongBreak.min, 'timeLongBreakMin')}
                value={timeLongBreak.min}
              />
              <s.time>мин.</s.time>
              <s.input
                type="number"
                onChange={(e) =>
                  onChangeTime(e.target.value, "timeLongBreakSec")
                }
                onBlur={() => formatTime(timeLongBreak.sec, 'timeLongBreakSec')}
                value={timeLongBreak.sec}
              />
              <span>сек.</span>
            </div>
          </s.item>
          <s.item>
            <s.label>Частота длинных перерывов:</s.label>
            <s.input
              type="number"
              onChange={(e) =>
                onChangeTime(e.target.value, "frequencyLongBreak")
              }
              value={String(frequencyLongBreak)}
            />
          </s.item>
          <s.item>
            <s.label>Уведомления:</s.label>
            <s.input
              type="checkbox"
              onChange={(e) => setIsNotifications(e.target.checked)}
              checked={isNotifications}
            />
          </s.item>
        </s.list>
      </Modal>
    </>
  );
};

export default Settings;
