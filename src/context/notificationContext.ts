import { createContext } from "react";
import { INotificationProps } from "../ui-components/Notification/Notification";

interface INotificationContext {
    addNotificationFunc: (notification: INotificationProps) => void
}

export const notificationContext = createContext<INotificationContext>({
    addNotificationFunc: () => {}
});