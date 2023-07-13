import { useState, useEffect, useRef, useMemo } from 'react';
import DriverType from "../../types/DriverType";
import CompetitorType from '../../types/CompetitorType';
import Speedway from '../Speedway';
import playDice from '../../utils/Dice';
import CarCardsContainer from '../CarCardsContainer';
import ClassificationTable from '../ClassificationTable';
import CarIcon from '../CarIcon';
import './style.css';
import TeamType from '../../types/TeamType';
import TeamRacingCompetitor from '../../types/TeamRacingCompetitorType';

type Props = {
    numberOfLaps: number;
    lapSize: number;
    teams: Array<TeamType>;
    systemPoints: Array<number>;
}

const Racing = ({ numberOfLaps, lapSize, teams, systemPoints }: Props) => {

    const [hasStarted, setHasStarted] = useState<boolean>(false);
    const [hasFinished, setHasFinished] = useState<boolean>(false);
    const [someoneFinished, setSomeoneFinished] = useState<boolean>(false);
    const [competitors, setCompetitors] = useState<Array<CompetitorType>>([]);
    const [teamCompetitors, setTeamCompetitors] = useState<Array<TeamRacingCompetitor>>([]);
    const isFirstRender = useRef<boolean>(true);

    useEffect(() => {
        if(isFirstRender.current) {
            const competitorsAux: Array<CompetitorType> = teams
                .reduce((prev: Array<DriverType>, curr) => {
                    return [...prev, ...curr.drivers]
                }, [])
                .map((driver) => ({
                    driver,
                    actualPosition: 0,
                    lastPosition: 0,
                    status: 'RUNNING',
                    racingPosition: undefined
                }))
            setCompetitors(competitorsAux);
            setTeamCompetitors(teams.map((team) => ({
                points: 0,
                team,
                position: undefined
            })))
        }

        return () => {
            isFirstRender.current = false;
        }
    }, [teams]);

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
                const teamCompetitorsAux = teamCompetitors;
                teamCompetitorsAux.forEach((team) => {
                    team.points = competitors
                        .filter((driverComp) => team.team.drivers.includes(driverComp.driver))
                        .reduce((prev, curr) => {
                            const position = curr.racingPosition!;
                            if(position <= systemPoints.length) {
                                return prev + systemPoints[position - 1];
                            }
                            return prev;
                        }, 0);
                });
                teamCompetitorsAux.sort((a, b) => b.points - a.points).forEach((c, i) => c.position = i + 1);
                console.log(teamCompetitorsAux)
                setTeamCompetitors(teamCompetitorsAux);
            }
        }, 1000);
    }

    const carCardsContainerMemo = useMemo(() => {
        return <CarCardsContainer drivers={teams.reduce((prev: Array<DriverType>, curr) => [...prev, ...curr.drivers], [])} />;
    }, [teams]);

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
                                <CarIcon color={c.driver.team.color} />
                                <span className="mx-4">{ c.driver.name }</span>
                            </div>,
                            pontuation: c.racingPosition! <= systemPoints.length ? systemPoints[c.racingPosition! - 1] : undefined
                        }))
                    }
                />
            ) }
            { hasFinished && <div className="mt-3">
                    <ClassificationTable 
                        descriptionHeader='Team'
                        classifications={
                            teamCompetitors.map((team) => ({
                                classification: team.position!,
                                description: team.team.name,
                                pontuation: team.points
                            }))
                        }
                    />
            </div> }
            
        </div>

    )

}

export default Racing;