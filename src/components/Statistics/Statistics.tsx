import { useEffect, useState } from "react";
import * as stylesGlobal from "../../style.global";
import * as s from "./style";
import StatisticsCard from "./StatisticsCard/StatisticsCard";
import { IData } from "./Graph/Graph";
import { getStoreData } from "../../helpers/IndexDB/getStoreData";
import { options, statisticsCardsTypes } from "./constants";
import HeaderStatistics from "./HeaderStatistics/HeaderStatistics";
import MainSettings from "./MainSettings/MainSettings";

const Statistics = () => {
  const [filterWeekValue, setFilterWeekValue] = useState(options[0]);
  const [dataStatistics, setDataStatistics] = useState<IData[]>([]);

  useEffect(() => {
    getStoreData("statistics").then((data) => {
      if (data) {
        setDataStatistics(data as IData[]);
      }
    });
  }, []);

  return (
    <s.main>
      <stylesGlobal.container>
        <HeaderStatistics
          filterWeekValue={filterWeekValue}
          setFilterWeekValue={setFilterWeekValue}
        />
        <MainSettings
          dataStatistics={dataStatistics}
          filterWeekValue={filterWeekValue}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {statisticsCardsTypes?.map((cardType, index) => {
            return <StatisticsCard key={index} type={cardType} />;
          })}
        </div>
      </stylesGlobal.container>
    </s.main>
  );
};

export default Statistics;
