import RacingDriverStatus from "./RacingDriverStatus";
import Driver from "./Driver"

type RacingDriver = {
    driver: Driver;
    lastPosition: number;
    actualPosition: number;
    racingPosition: number | undefined;
    points: number;
    status: RacingDriverStatus;
}

export default RacingDriver;