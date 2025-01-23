import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import SectionMain from "./components/SectionMain/SectionMain";
import Statistics from "./components/Statistics/Statistics";
import { useEffect, useState } from "react";
import { statisticsContext } from "./context/statisticsContext";
import { initDB } from "./helpers/IndexDB/initDB";
import { getStoreData } from "./helpers/IndexDB/getStoreData";
import { IData } from "./components/Statistics/Graph/Graph";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import * as s from "./style.global";
import { themeContext } from "./context/themeContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { notificationContext } from "./context/notificationContext";
import Notification, {
  INotificationProps,
} from "./ui-components/Notification/Notification";
import { ThemeType } from "./types.global";

function App() {
  const [timePause, setTimePause] = useState(0);
  const [focus, setFocus] = useState(0);
  const [countStop, setCountStop] = useState(0);
  const [allPomidiro, setAllPomidoro] = useState(0);
  const [timeAll, setTimeAll] = useState(0);

  const [, setStatusIndexDB] = useState(false);
  const [notifications, setNotifications] = useState<INotificationProps[]>([]);

  const [theme, setTheme] = useLocalStorage<ThemeType>("theme", "light");

  const StatisticsDataProvider = statisticsContext.Provider;
  const ThemeProviderContext = themeContext.Provider;
  const NotificationProvider = notificationContext.Provider;

  const addNotification = (notification: INotificationProps) => {
    setNotifications((state) => [...state, notification]);
  };

  // иницилизация БД
  useEffect(() => {
    const fn = async () => {
      const status = await initDB();
      setStatusIndexDB(status);
    };

    fn();
  }, []);

  // получение данных статистики с БД, обновление стейтов
  useEffect(() => {
    getStoreData<IData>("statistics").then((data: IData[]) => {
      if (data) {
        const currentDate = new Date().toISOString().split("T")[0];
        const serachDate = data?.find((item) => {
          return currentDate === item?.date;
        });

        if (serachDate) {
          setTimePause(serachDate.timePause);
          setFocus(serachDate.focus);
          setCountStop(serachDate.countStop);
          setAllPomidoro(serachDate.allPomidiro);
          setTimeAll(serachDate.timeAll);
        }
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <NotificationProvider value={{ addNotificationFunc: addNotification }}>
        <ThemeProviderContext value={theme}>
          <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <s.globalStyle />
            <StatisticsDataProvider
              value={{
                focus: focus,
                pauseTime: timePause,
                stops: countStop,
                allPomidiro,
                timeAll: timeAll,
                setCountStop: setCountStop,
                setFocus: setFocus,
                setTimePause: setTimePause,
                setAllPomidoro: setAllPomidoro,
                setTimeAll: setTimeAll,
              }}
            >
              <Layout>
                <Header theme={theme} setTheme={setTheme} />
                <Routes>
                  <Route path="/" element={<SectionMain />} />
                  <Route path="/statistics" element={<Statistics />} />
                </Routes>
              </Layout>

              {notifications?.length > 0 && (
                <Notification
                  notifications={notifications}
                  setNotifications={setNotifications}
                />
              )}
            </StatisticsDataProvider>
          </ThemeProvider>
        </ThemeProviderContext>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
