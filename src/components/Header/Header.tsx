import logo from "../../assets/Header/logo.svg";
import * as s from "./style";
import * as stylesGlobal from "../../style.global";
import StatisticsIcon from "../Icons/StatisticsIcon";
import { useState } from "react";
import { ThemeType } from "src/types.global";
import { Link, useLocation } from "react-router-dom";

interface IHeader {
  theme: ThemeType;
  setTheme: (state: ThemeType) => void;
}

const Header = ({ theme, setTheme }: IHeader) => {
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(theme === "dark");

  const switchTheme = (checked: boolean) => {
    setIsChecked(checked);
    checked ? setTheme("dark") : setTheme("light");
  };

  return (
    <s.main>
      <stylesGlobal.container>
        <s.header>
          <Link to={'/'}>
            <img src={logo}></img>
          </Link>
          <div style={{ display: "flex" }}>
            <s.theme
              className="switch"
              checked={isChecked}
              onChange={(e) => switchTheme(e.target.checked)}
              label={"Переключить тему"}
            />
            {location?.pathname === "/" && (
              <s.linkStatistics to={"/statistics"}>
                <StatisticsIcon />
                Статистика
              </s.linkStatistics>
            )}
            {location?.pathname === "/statistics" && (
              <s.linkStatistics to={"/"}>
                Главная
              </s.linkStatistics>
            )}
          </div>
        </s.header>
      </stylesGlobal.container>
    </s.main>
  );
};

export default Header;
