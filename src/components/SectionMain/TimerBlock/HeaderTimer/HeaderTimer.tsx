import { ITask } from '../../types';
import * as s from './style'

interface IHeaderTimer {
  isCount: boolean;
  isPause: boolean;
  isBreak: boolean;
  currentBreak: number;
  currentTask: ITask;
  currentPomidoro: number;
}

const HeaderTimer = ({
  currentBreak,
  isBreak,
  isCount,
  isPause,
  currentTask,
  currentPomidoro,
}: IHeaderTimer) => {
  return (
    <s.header $isCount={isCount || isPause} $isBreak={isBreak}>
      <s.textInformation fontWeight={700}>{currentTask.name}</s.textInformation>
      <s.textInformation>
        {isBreak ? `Перерыв ${currentBreak}` : `Помидор ${currentPomidoro}`}
      </s.textInformation>
    </s.header>
  );
};

export default HeaderTimer;
