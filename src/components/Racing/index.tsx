import { useState, useRef } from 'react';
import Driver from "../../types/Driver";
import RacingDriver from '../../types/RacingDriver';
import Speedway from '../Speedway';
import playDice from '../../utils/Dice';
import DriverCardsContainer from '../DriverCardsContainer';
import ClassificationTable from '../ClassificationTable';
import CarIcon from '../CarIcon';
import Team from '../../types/Team';
import RacingTeam from '../../types/RacingTeam';
import './style.css';
import RacingPoints from '../../types/RacingPoints';

type Props = {
    numberOfLaps: number;
    lapSize: number;
    teams: Array<Team>;
    systemPoints: Array<number>;
    setRacingPoints: (racingPoints: Array<RacingPoints>) => void
}

const Racing = ({ numberOfLaps, lapSize, teams, systemPoints, setRacingPoints }: Props) => {

    const [hasStarted, setHasStarted] = useState<boolean>(false);
    const [racingDrivers, setRacingDrivers] = useState<Array<RacingDriver>>(() => teams
            .reduce((prev: Array<Driver>, curr) => [...prev, ...curr.drivers], [])
            .map((driver) => ({
                driver,
                position: 0,
                racingPosition: undefined,
                points: 0
            })));
    const [racingTeams, setRacingTeams] = useState<Array<RacingTeam>>(() => teams.map((team) => ({
                points: 0,
                team,
                position: undefined
            })));
    const ciclo = useRef<number>(0);
    const run = useRef<boolean>(false);
    const speedWayLength = lapSize * numberOfLaps;
    const someoneFinished = racingDrivers.some((racingDriver) => racingDriver.position > speedWayLength);
    const hasFinished = racingDrivers.every((racingDriver) => racingDriver.position > speedWayLength);

    const initRace = () => {
        setHasStarted(true);
        ciclo.current = setInterval(() => {
            setRacingDrivers((prevState) => {
                if(run.current) {
                    let nextRacingDrivers = prevState.map((racingDrivers) => ({...racingDrivers}));
                    nextRacingDrivers = nextRacingDrivers.map((racingDriver) => {
                        if(racingDriver.position <= speedWayLength) {
                            racingDriver.position += (playDice() + playDice());
                            if(racingDriver.position > speedWayLength) {
                                const numberOfFinishedDrivers = nextRacingDrivers.filter((r) => r.position > speedWayLength).length - 1;
                                console.log(`numberOfFinishedDrivers: ${numberOfFinishedDrivers}`);
                                racingDriver.racingPosition = numberOfFinishedDrivers + 1;
                                if(racingDriver.racingPosition <= systemPoints.length) {
                                    racingDriver.points = systemPoints[racingDriver.racingPosition - 1];
                                }
                            }
                            return racingDriver;
                        }
                        return racingDriver;
                    })
                    nextRacingDrivers.sort((driverA, driverB) => {
                        if(driverA.racingPosition && driverB.racingPosition) {
                            return driverA.racingPosition - driverB.racingPosition;
                        }
                        if(driverA.racingPosition) {
                            return -1;
                        }
                        if(driverB.racingPosition) {
                            return 1;
                        }
                        return driverB.position - driverA.position;
                    });
                    run.current = false;
                    return nextRacingDrivers;
                }
                else {
                    run.current = true;
                    return prevState;
                }
            });
        }, 250);
    }

    if(hasFinished) {
        clearInterval(ciclo.current);
    }

    const handleSetPoints = () => {
        setRacingPoints(racingDrivers.map((racingDriver) => ({
            driver: racingDriver.driver,
            points: racingDriver.points
        })));
    }

    return (
        <div>
            <h1>Positions:</h1>
            <DriverCardsContainer 
                drivers={[...racingDrivers].reverse().map((racingDriver) => racingDriver.driver)}
            />
            { !hasStarted && <button className="btn btn-primary my-3" onClick={initRace}>Start race</button>} 
            { hasFinished && (
                <button className="btn btn-primary mb-3" onClick={handleSetPoints}>Go to championship classification</button>
            ) }
            { !hasFinished && <Speedway  
                lapSize={lapSize}
                numberOfLaps={numberOfLaps}
                racingDrivers={racingDrivers}
            /> }
            { someoneFinished && (
                <div className="container-fluid">
                    <div className='row'>
                        <div className={hasFinished ? 'col-12 col-lg-6' : 'col-12'}>
                            <h2 className="mb-2 text-center fs-1 fw-bold">Drivers</h2>
                            <ClassificationTable 
                                descriptionHeader='Driver'
                                classificationItens={
                                    racingDrivers.filter((racingDriver) => racingDriver.position > speedWayLength)
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