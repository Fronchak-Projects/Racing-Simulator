import DriverType from "./DriverType";

type TeamType = {
    id: number;
    name: string;
    color: string;
    drivers: Array<DriverType>
}

export default TeamType;