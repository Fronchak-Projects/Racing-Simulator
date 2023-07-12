import { useState, useEffect, useRef, useMemo } from 'react';
import DriverType from "../../types/DriverType";
import CompetitorType from '../../types/CompetitorType';
import Speedway from '../Speedway';
import playDice from '../../utils/Dice';
import CarCardsContainer from '../CarCardsContainer';
import ClassificationTable from '../ClassificationTable';
import CarIcon from '../CarIcon';
import './style.css';

type Props = {
    numberOfLaps: number;
    lapSize: number;
    drivers: Array<DriverType>
    systemPoints: Array<number>
}

const Racing = ({ numberOfLaps, lapSize, drivers, systemPoints }: Props) => {

    const [hasStarted, setHasStarted] = useState<boolean>(false);
    const [hasFinished, setHasFinished] = useState<boolean>(false);
    const [someoneFinished, setSomeoneFinished] = useState<boolean>(false);
    const [competitors, setCompetitors] = useState<Array<CompetitorType>>([]);
    const isFirstRender = useRef<boolean>(true);

    useEffect(() => {
        if(isFirstRender.current) {
            setCompetitors(drivers.map((driver) => ({
                driver,
                actualPosition: 0,
                lastPosition: 0,
                status: 'RUNNING',
                racingPosition: undefined
            })));
        }

        return () => {
            isFirstRender.current = false;
        }
    }, [drivers]);

    const initRace = () => {
        setHasStarted(true);
        const ciclo = setInterval(() => {
            const competitorsAux = competitors;
            competitorsAux.forEach((competitor) => {
                if(competitor.status === 'RUNNING') {
                    competitor.actualPosition = competitor.actualPosition + playDice() + playDice();
                    if(competitor.actualPosition > lapSize * numberOfLaps) {
                        const position = competitorsAux.filter((c) => c.status === 'FINISHED').length + 1;
                        competitor.racingPosition = position;
                        competitor.status = 'FINISHED';
                        if(!someoneFinished) setSomeoneFinished(true);
                    }
                }
            })
            setCompetitors([...competitorsAux]);
            if(competitors.every((c) => c.status === 'FINISHED')) {
                setHasFinished(true);
                clearInterval(ciclo);
            }
        }, 200);
    }

    const carCardsContainerMemo = useMemo(() => {
        return <CarCardsContainer drivers={drivers} />;
    }, [drivers]);

    return (
        <div>
            <h1>Competitors:</h1>
            { carCardsContainerMemo }
            { !hasStarted && <button className="btn btn-primary my-3" onClick={initRace}>Start race</button>} 
            { !hasFinished && <Speedway  
                lapSize={lapSize}
                numberOfLaps={numberOfLaps}
                competitors={competitors}
            /> }
            { someoneFinished && (
                <ClassificationTable 
                    descriptionHeader='Driver'
                    classifications={
                        competitors.filter((c) => c.status === 'FINISHED')
                        .sort((a, b) => a.racingPosition! - b.racingPosition!)
                        .map((c) => ({
                            classification: c.racingPosition!,
                            description: <div className="d-flex align-center">
                                <CarIcon color={c.driver.color} />
                                <span className="mx-4">{ c.driver.name }</span>
                            </div>,
                            pontuation: c.racingPosition! <= systemPoints.length ? systemPoints[c.racingPosition! - 1] : undefined
                        }))
                    }
                />
            ) }
            
        </div>

    )

}

export default Racing;