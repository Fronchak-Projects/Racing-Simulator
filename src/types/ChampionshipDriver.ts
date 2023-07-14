import Driver from "./Driver"

type ChampionshipDriver = {
    driver: Driver,
    lastPosition?: number;
    position?: number;
    lastPoints: number;
    points: number;
}

export default ChampionshipDriver;