import Driver from "./Driver"

type RacingDriver = {
    driver: Driver;
    position: number;
    racingPosition: number | undefined;
    points: number;
}

export default RacingDriver;