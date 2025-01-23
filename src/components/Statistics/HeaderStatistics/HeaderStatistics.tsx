import { IOptions } from "../../../ui-components/Select/Select";
import { options } from "../constants";
import * as s from './style'

interface IHeaderStatistics {
    filterWeekValue: IOptions;
    setFilterWeekValue: (state: IOptions) => void
}

const HeaderStatistics = ({filterWeekValue, setFilterWeekValue}: IHeaderStatistics) => {
  return (
    <s.wrap
    >
      <s.title>Ваша активность</s.title>
      <s.select
        options={options}
        onChange={(value) => setFilterWeekValue(value)}
        value={filterWeekValue}
      />
    </s.wrap>
  );
};

export default HeaderStatistics;
