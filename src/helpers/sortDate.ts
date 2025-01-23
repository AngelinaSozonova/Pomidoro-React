import { IData } from "../components/Statistics/Graph/Graph";

export const sortDate = (data: IData[]) => {
    return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
