import { useContext, useState } from "react";
import { statisticsContext } from "../../../context/statisticsContext";
import Graph, { IData, weekType } from "../Graph/Graph";

import { IOptions } from "../../../ui-components/Select/Select";
import TimeBlock from "./TimeBlock/TimeBlock";
import PomidoroCount from "./PomidoroCount/PomidoroCount";

interface IMainSettings {
  dataStatistics: IData[];
  filterWeekValue: IOptions;
}

const MainSettings = ({ dataStatistics, filterWeekValue }: IMainSettings) => {
  const { allPomidiro } = useContext(statisticsContext);

  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  const isActive = allPomidiro !== 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "32px",
      }}
    >
      <div style={{ width: "23.1%", marginRight: "32px" }}>
        <TimeBlock currentDay={currentDay} isActive={isActive} />
        <PomidoroCount isActive={isActive} allPomidiro={allPomidiro} />
      </div>
      <Graph
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        data={dataStatistics}
        week={filterWeekValue.value as weekType}
      />
    </div>
  );
};

export default MainSettings;
