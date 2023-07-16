import { useState, useRef, useEffect } from 'react';
import Driver from "../../types/Driver";
import RacingDriver from '../../types/RacingDriver';
import Speedway from '../Speedway';
import playDice from '../../utils/Dice';
import DriverCardsContainer from '../DriverCardsContainer';
import ClassificationTable from '../ClassificationTable';
import Team from '../../types/Team';
import RacingPoints from '../../types/RacingPoints';
import TableTitle from '../TableTitle';
import TeamRacingClassification from '../../types/TeamRacingClassification';

type TeamRacingTable = {
    team: Team;
    points: number;
    firstPosition: number;
}

type Props = {
    numberOfLaps: number;
    lapSize: number;
    teams: Array<Team>;
    systemPoints: Array<number>;
    setRacingResulst: (racingPoints: Array<RacingPoints>, teamsClassifications: Array<TeamRacingClassification>) => void
}

const Racing = ({ numberOfLaps, lapSize, teams, systemPoints, setRacingResulst }: Props) => {

    const [racingDrivers, setRacingDrivers] = useState<Array<RacingDriver>>(() => teams
            .reduce((prev: Array<Driver>, curr) => [...prev, ...curr.drivers], [])
            .map((driver) => ({
                driver,
                position: 0,
                racingPosition: undefined,
                points: 0
            })));

    const ciclo = useRef<number>(0);
    const run = useRef<boolean>(false);
    const speedWayLength = lapSize * numberOfLaps;
    const someoneFinished = racingDrivers.some((racingDriver) => racingDriver.position > speedWayLength);
    const hasFinished = racingDrivers.every((racingDriver) => racingDriver.position > speedWayLength);

    useEffect(() => {
        ciclo.current = setInterval(() => {
            setRacingDrivers((prevState) => {
                if(run.current) {
                    let nextRacingDrivers = prevState.map((racingDrivers) => ({...racingDrivers}));
                    nextRacingDrivers = nextRacingDrivers.map((racingDriver) => {
                        if(racingDriver.position <= speedWayLength) {
                            racingDriver.position += (playDice() + playDice());
                            if(racingDriver.position > speedWayLength) {
                                const numberOfFinishedDrivers = nextRacingDrivers.filter((r) => r.position > speedWayLength).length - 1;
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

        return () => {
            clearInterval(ciclo.current);
        }
    }, [speedWayLength, systemPoints]);

    if(hasFinished) {
        clearInterval(ciclo.current);
    }

    const getTeamRacingTable = (): Array<TeamRacingTable> => {
        return teams.map((team) => {
            const drivers: Array<RacingDriver> = racingDrivers.filter((racingDriver) => racingDriver.driver.team.id === team.id);
            const points = drivers.reduce((prev, curr) => prev + curr.points, 0);
            const firstPosition = racingDrivers.findIndex((racingDriver) => racingDriver.driver.team.id === team.id) + 1;
            return {
                team: team,
                points,
                firstPosition
            }
        }).sort((teamA, teamB) => {
            if(teamA.points === teamB.points) {
                return teamA.firstPosition - teamB.firstPosition;
            }
            return teamB.points - teamA.points;
        })
    }

    const handleSetPoints = () => {
        const racingPoints: Array<RacingPoints> = racingDrivers.map((racingDriver) => ({
            driver: racingDriver.driver,
            points: racingDriver.points
        }));
        const teamRacingClassification: Array<TeamRacingClassification> = getTeamRacingTable()
            .map((teamTable, i) => {
                return {
                    team: teamTable.team,
                    racingPosition: i + 1
                }
            })
            setRacingResulst(racingPoints, teamRacingClassification);
    }

    return (
        <div>
            <h1>Positions:</h1>
            <DriverCardsContainer 
                drivers={[...racingDrivers].reverse().map((racingDriver) => racingDriver.driver)}
            />
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
                            <TableTitle title='Drivers' />
                            <ClassificationTable 
                                descriptionHeader='Driver'
                                classificationItens={
                                    racingDrivers.filter((racingDriver) => racingDriver.position > speedWayLength)
                                    .map((racingDriver) => ({
                                        classification: racingDriver.racingPosition!,
                                        description: 
                                            <span 
                                                style={{
                                                    color: racingDriver.driver.team.color
                                                }}
                                                >{ racingDriver.driver.name }
                                            </span>
                                        ,
                                        pontuation: racingDriver.points
                                    }))
                                }
                            />
                        </div>
                        { hasFinished && <div className="col-12 col-lg-6 mt-3 mt-lg-0">
                            <TableTitle title='Teams' />
                            <ClassificationTable 
                                descriptionHeader='Team'
                                classificationItens={
                                    getTeamRacingTable().map((team, i) => ({
                                        classification: i + 1,
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