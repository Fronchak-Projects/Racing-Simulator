import { useState, useMemo } from 'react';
import Driver from "../../types/Driver";
import RacingDriver from '../../types/RacingDriver';
import Speedway from '../Speedway';
import playDice from '../../utils/Dice';
import CarCardsContainer from '../CarCardsContainer';
import ClassificationTable from '../ClassificationTable';
import CarIcon from '../CarIcon';
import Team from '../../types/Team';
import RacingTeam from '../../types/RacingTeam';
import './style.css';

type Props = {
    numberOfLaps: number;
    lapSize: number;
    teams: Array<Team>;
    systemPoints: Array<number>;
}

const Racing = ({ numberOfLaps, lapSize, teams, systemPoints }: Props) => {

    const [hasStarted, setHasStarted] = useState<boolean>(false);
    const [racingDrivers, setRacingDrivers] = useState<Array<RacingDriver>>(() => teams
            .reduce((prev: Array<Driver>, curr) => [...prev, ...curr.drivers], [])
            .map((driver) => ({
                driver,
                actualPosition: 0,
                lastPosition: 0,
                status: 'RUNNING',
                racingPosition: undefined,
                points: 0
            })));
    const [racingTeams, setRacingTeams] = useState<Array<RacingTeam>>(() => teams.map((team) => ({
                points: 0,
                team,
                position: undefined
            })));
    const speedWayLength = lapSize * numberOfLaps;
    const someoneFinished = racingDrivers.some((racingDriver) => racingDriver.status === 'FINISHED');
    const hasFinished = racingDrivers.every((racingDriver) => racingDriver.status === 'FINISHED');

    const initRace = () => {
        setHasStarted(true);
        const ciclo = setInterval(() => {
            setRacingDrivers((prevState) => {
                const finishingRacingDrivers: Array<RacingDriver> = [];
                const nextRacingDrivers = prevState.map((racingDriver) => {
                    if(racingDriver.status === 'RUNNING') {
                        const nextRacingDriver = {...racingDriver};
                        nextRacingDriver.lastPosition = nextRacingDriver.actualPosition;
                        nextRacingDriver.actualPosition = nextRacingDriver.actualPosition + playDice() + playDice();
                        if(nextRacingDriver.actualPosition > speedWayLength) {
                            finishingRacingDrivers.push(nextRacingDriver);
                        }
                        return nextRacingDriver;
                    }
                    else {
                        return racingDriver;
                    }
                });
    
                if(finishingRacingDrivers.length >= 1) {
                    const driversFinished = prevState.filter((racingDriver) => racingDriver.status === 'FINISHED').length;
                    finishingRacingDrivers
                        .sort((a, b) => 
                            a.lastPosition == b.lastPosition ? 
                            a.actualPosition - b.actualPosition : 
                            a.lastPosition - b.lastPosition);
    
                    let lastPosition = 0;
                    let actualPosition = 0;
                    let referencePosition = 0;
                    finishingRacingDrivers.forEach((racingDriver, i) => {
                        racingDriver.status = 'FINISHED';
                        if(racingDriver.lastPosition == lastPosition && racingDriver.actualPosition == actualPosition) {
                            racingDriver.racingPosition = referencePosition;
                        }
                        else {
                            racingDriver.racingPosition = driversFinished + i + 1;
                            lastPosition = racingDriver.lastPosition;
                            actualPosition = racingDriver.actualPosition;
                            referencePosition = racingDriver.racingPosition!;
                        }
                        if(racingDriver.racingPosition <= systemPoints.length) {
                            racingDriver.points = systemPoints[racingDriver.racingPosition - 1];
                        }
                    })
                }

                if(nextRacingDrivers.every((racingDriver) => racingDriver.status === 'FINISHED')) {
                    clearInterval(ciclo);
                    const nextRacingTeams: Array<RacingTeam> = racingTeams.map((racingTeam) => {
                        const points = nextRacingDrivers.filter((racingDriver) => racingDriver.driver.team.id === racingTeam.team.id)
                            .reduce((prev, curr) => prev + curr.points , 0);
                        return {
                            ...racingTeam,
                            points
                        }
                    })
    
                    nextRacingTeams.sort((a, b) => b.points - a.points);
    
                    let points = -1;
                    let position = -1;
    
                    nextRacingTeams.forEach((racingTeam, i) => {
                        if(racingTeam.points === points) {
                            racingTeam.position = position;
                        }
                        else {
                            points = racingTeam.points;
                            racingTeam.position = i + 1;
                            position = racingTeam.position;
                        }
                    });
                    setRacingTeams(nextRacingTeams);
                }
                return nextRacingDrivers;
            });
        }, 300);
    }

    const carCardsContainerMemo = useMemo(() => {
        return <CarCardsContainer drivers={teams.reduce((prev: Array<Driver>, curr) => [...prev, ...curr.drivers], [])} />;
    }, [teams]);

    return (
        <div>
            <h1>Competitors:</h1>
            { carCardsContainerMemo }
            { !hasStarted && <button className="btn btn-primary my-3" onClick={initRace}>Start race</button>} 
            { !hasFinished && <Speedway  
                lapSize={lapSize}
                numberOfLaps={numberOfLaps}
                competitors={racingDrivers}
            /> }
            { someoneFinished && (
                <div className="container-fluid">
                    <div className='row'>
                        <div className={hasFinished ? 'col-12 col-lg-6' : 'col-12'}>
                            <h2 className="mb-2 text-center fs-1 fw-bold">Drivers</h2>
                            <ClassificationTable 
                                descriptionHeader='Driver'
                                classifications={
                                    racingDrivers.filter((racingDriver) => racingDriver.status === 'FINISHED')
                                    .sort((a, b) => a.racingPosition! - b.racingPosition!)
                                    .map((racingDriver) => ({
                                        classification: racingDriver.racingPosition!,
                                        description: <div className="d-flex align-center">
                                            <CarIcon color={racingDriver.driver.team.color} />
                                            <span 
                                                style={{
                                                    color: racingDriver.driver.team.color
                                                }}
                                                className="mx-4">{ racingDriver.driver.name }
                                            </span>
                                        </div>,
                                        pontuation: racingDriver.points
                                    }))
                                }
                            />
                        </div>
                        { hasFinished && <div className="col-12 col-lg-6 mt-3 mt-lg-0">
                            <h2 className="mb-2 text-center fs-1 fw-bold">Teams</h2>
                            <ClassificationTable 
                                descriptionHeader='Team'
                                classificationItens={
                                    racingTeams.map((team) => ({
                                        classification: team.position!,
                                        description: <span
                                            style={{
                                                color: team.team.color
                                            }}
                                        >{ team.team.name }</span>,
                                        pontuation: team.points
                                    }))
                                }
                            />
                        </div> }
                    </div>   
                </div>
            ) }
        </div>
    )
}

export default Racing;