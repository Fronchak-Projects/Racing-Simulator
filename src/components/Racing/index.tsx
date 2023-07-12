import { useState } from 'react';
import DriverType from "../../types/DriverType";
import CompetitorType from '../../types/CompetitorType';
import Speedway from '../Speedway';
import { random } from '../../utils/MathUtils';

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

const driver3: DriverType = {
    id: 3,
    color: "#B83FBF",
    name: "Driver 3"
}

const driver4: DriverType = {
    id: 4,
    color: "#4C3FBF",
    name: "Driver 4"
}

const driver5: DriverType = {
    id: 5,
    color: "#68BF3F",
    name: "Driver 5"
}

const driver6: DriverType = {
    id: 6,
    color: "#E9986C",
    name: "Driver 6"
}

const Racing = ({ numberOfLaps, lapSize }: Props) => {

    const [hasStarted, setHasStarted] = useState<boolean>(false);
    const [hasFinished, setHasFinished] = useState<boolean>(false);
    const [competitors, setCompetitors] = useState<Array<CompetitorType>>([
        {
            driver: driver1,
            actualPosition: 0,
            lastPosition: 0,
            status: 'RUNNING',
            racingPosition: undefined
        },
        {
            driver: driver2,
            actualPosition: 0,
            lastPosition: 0,
            status: 'RUNNING',
            racingPosition: undefined
        },
        {
            driver: driver3,
            actualPosition: 0,
            lastPosition: 0,
            status: 'RUNNING',
            racingPosition: undefined
        },
        {
            driver: driver4,
            actualPosition: 0,
            lastPosition: 0,
            status: 'RUNNING',
            racingPosition: undefined
        },        {
            driver: driver5,
            actualPosition: 0,
            lastPosition: 0,
            status: 'RUNNING',
            racingPosition: undefined
        },
        {
            driver: driver6,
            actualPosition: 0,
            lastPosition: 0,
            status: 'RUNNING',
            racingPosition: undefined
        }
    ]);

    const initRace = () => {
        setHasStarted(true);
        const ciclo = setInterval(() => {
            const competitorsAux = competitors;
            competitorsAux.forEach((competitor) => {
                competitor.actualPosition = competitor.actualPosition + random(1, 6);
            })
            setCompetitors([...competitorsAux]);
        }, 400);
    }

    return (
        <div>
            <button className="btn btn-primary mb-3" onClick={initRace}>Start race</button>
            <Speedway  
                lapSize={lapSize}
                numberOfLaps={numberOfLaps}
                competitors={competitors}
            />
        </div>

    )

}

export default Racing;