import CompetitorStatus from "./CompetitorStatus";
import DriverType from "./DriverType"

type CompetitorType = {
    driver: DriverType;
    lastPosition: number;
    actualPosition: number;
    racingPosition: number | undefined;
    status: CompetitorStatus;
}

export default CompetitorType;