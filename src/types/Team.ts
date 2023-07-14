import Driver from "./Driver";

type Team = {
    id: number;
    name: string;
    color: string;
    drivers: Array<Driver>
}

export default Team;