import { useEffect } from "react";
import CloseIcon from "../../components/Icons/ClostIcon";
import { v4 as uuidv4 } from "uuid";
import * as s from "./style";

export interface INotificationProps {
  id: number | string;
  status: "success" | "warning" | "error" | "info";
  title?: string;
  description?: string;
}

interface INotification {
  notifications: INotificationProps[];
  setNotifications: React.Dispatch<React.SetStateAction<INotificationProps[]>>;
}

const Notification = ({ notifications, setNotifications }: INotification) => {
  const deleteNotification = (id: number | string) => {
    setNotifications((state) => state.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((state) => state.slice(1));
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [setNotifications]);

  return (
    <s.block>
      {notifications?.map((item) => (
        <s.wrapInfo key={uuidv4()}>
          <s.closeButton onClick={() => deleteNotification(item.id)}>
            <CloseIcon />
          </s.closeButton>
          <s.title $isDescr={item?.description}>{item.title}</s.title>
          <s.description>{item.description}</s.description>
        </s.wrapInfo>
      ))}
    </s.block>
  );
};

export default Notification;
