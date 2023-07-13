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
            const finishingCompetitors: Array<CompetitorType> = [];
            competitorsAux.forEach((competitor) => {
                if(competitor.status === 'RUNNING') {
                    competitor.lastPosition = competitor.actualPosition;
                    competitor.actualPosition = competitor.actualPosition + playDice() + playDice();
                    if(competitor.actualPosition > lapSize * numberOfLaps) {
                        if(!someoneFinished) setSomeoneFinished(true);
                        finishingCompetitors.push(competitor);
                    }
                }
            });

            if(finishingCompetitors.length >= 1) {
                const position = competitorsAux.filter((c) => c.status === 'FINISHED').length + 1;
                finishingCompetitors.sort((a, b) => a.lastPosition == b.lastPosition ? a.actualPosition - b.actualPosition : a.lastPosition - b.lastPosition);

                let lastPosition = 0;
                let actualPosition = 0;
                let referencePosition = 0;
                finishingCompetitors.forEach((c, i) => {
                    c.status = 'FINISHED';
                    if(c.lastPosition == lastPosition && c.actualPosition == actualPosition) {
                        c.racingPosition = referencePosition;
                    }
                    else {
                        c.racingPosition = position + i;
                        lastPosition = c.lastPosition;
                        actualPosition = c.actualPosition;
                        referencePosition = c.racingPosition!;
                    }

                })
            }
            setCompetitors([...competitorsAux]);
            if(competitors.every((c) => c.status === 'FINISHED')) {
                setHasFinished(true);
                clearInterval(ciclo);
            }
        }, 1000);
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