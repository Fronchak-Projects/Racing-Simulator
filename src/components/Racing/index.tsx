import { useState } from 'react';
import DriverType from "../../types/DriverType";
import CompetitorType from '../../types/CompetitorType';
import Speedway from '../Speedway';

type Props = {
    numberOfLaps: number;
    lapSize: number;
}

const driver1: DriverType = {
    id: 1,
    color: "#C14242",
    name: "Driver 1"
}

const driver2: DriverType = {
    id: 2,
    color: "#3F74BF",
    name: "Driver 2"
}

const Racing = ({ numberOfLaps, lapSize }: Props) => {

    const [competitors, setCompetitors] = useState<Array<CompetitorType>>([
        {
            driver: driver1,
            actualPosition: 8,
            lastPosition: 0,
            status: 'RUNNING',
            racingPosition: undefined
        },
        {
            driver: driver2,
            actualPosition: 32,
            lastPosition: 0,
            status: 'RUNNING',
            racingPosition: undefined
        }
    ]);

    return (
        <Speedway  
            lapSize={lapSize}
            numberOfLaps={numberOfLaps}
            competitors={competitors}
        />
    )

}

export default Racing;