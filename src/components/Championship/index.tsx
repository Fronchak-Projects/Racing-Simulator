import { useState } from 'react';
import Team from "../../types/Team";
import ChampionshipTeam from '../../types/ChampionshipTeam';
import ChampionshipStatus from '../../types/ChampionshipStatus';
import TeamCardsContainer from '../TeamCardsContainer';
import Racing from '../Racing';
import Driver from '../../types/Driver';
import RacingPoints from '../../types/RacingPoints';
import ChampionshipDriver from '../../types/ChampionshipDriver';
import TableTitle from '../TableTitle';
import TeamRacingClassification from '../../types/TeamRacingClassification';
import ChampionshipTable from '../ChampionshipTable';

type Props = {
    numberOfRacings: number;
    numberOfLaps: number;
    lapSize: number;
    teams: Array<Team>;
    systemPoints: Array<number>;
}

type ChampionshipDriverTable = {
    driver: Driver,
    points: number;
    numberOfFirstPlaces: number;
    numberOfSecondPlaces: number;
    numberOfThirdPlaces: number;
    racingPoints: Array<number>;
    situation?: number;
}

type ChampionshipTeamTable = {
    team: Team,
    points: number;
    racingClassifications: Array<number>;
    numberOfFirstPlaces: number;
    numberOfSecondPlaces: number;
    numberOfThirdPlaces: number;
    drivers: Array<ChampionshipDriverTable>;
    situation?: number;
}

const Championship = ({ numberOfRacings, numberOfLaps, lapSize, teams, systemPoints }: Props) => {

    const [status, setStatus] = useState<ChampionshipStatus>('NOT_STARTED');
    const [racingNumber, setRacingNumber] = useState<number>(0);
    const [championshipTeams, setChampionShipTeams] = useState<Array<ChampionshipTeam>>(() => teams
        .map((team) => ({
            team: team,
            championshipDrivers: team.drivers.map((driver) => ({
                driver: driver,
                racingPoints: []
            })),
            racingPositions: []
        }))
    );

    const startChampionship = () => {
        setStatus('RACING');
        setRacingNumber(1);
    }

    const handleRacingResults = (points: Array<RacingPoints>, teamsClassifications: Array<TeamRacingClassification>) => {
        const nextChampionshipTeams: Array<ChampionshipTeam> = championshipTeams.map((championshipTeam) => {
            const racingPosition = teamsClassifications.find((teamClassificatio) => teamClassificatio.team.id === championshipTeam.team.id)?.racingPosition as number;
            return {
                team: championshipTeam.team,
                championshipDrivers: championshipTeam.championshipDrivers.map((championshipDriver) => {
                    const racingPoints = points.find((p) => p.driver.id === championshipDriver.driver.id)?.points ?? 0;
                    return {
                        ...championshipDriver,
                        racingPoints: [...championshipDriver.racingPoints, racingPoints]
                    }
                }),
                racingPositions: [...championshipTeam.racingPositions, racingPosition]
            }
        });
        setChampionShipTeams(nextChampionshipTeams);
        if(racingNumber === numberOfRacings) {
            setStatus('FINISHED');
        }
        else {
            setStatus('SUMMARY');
        }
    }

    const driversTable = () => {
        const drivers: Array<ChampionshipDriverTable> = championshipTeams.reduce((prev: Array<ChampionshipDriver>, curr) => {
            return [...prev, ...curr.championshipDrivers]
        }, []).map((championshipDriver) => {
            const points = championshipDriver.racingPoints.reduce((prev, curr) => prev + curr, 0);
            const numberOfFirstPlaces = championshipDriver.racingPoints.filter((racingPoint) => racingPoint === systemPoints[0]).length;
            const numberOfSecondPlaces = championshipDriver.racingPoints.filter((racingPoint) => racingPoint === systemPoints[1]).length;
            const numberOfThirdPlaces = championshipDriver.racingPoints.filter((racingPoint) => racingPoint === systemPoints[2]).length;
            return {
                ...championshipDriver,
                points,
                numberOfFirstPlaces,
                numberOfSecondPlaces,
                numberOfThirdPlaces
            }
        }).sort(compareDrivers);

        const teamsTable: Array<ChampionshipTeamTable> = teams.map((team) => {
            const teamDrivers: Array<ChampionshipDriverTable> = drivers.filter((driver) => driver.driver.team.id === team.id);
            const points = teamDrivers.reduce((prev, curr) => prev + curr.points, 0);
            const racingPositions: Array<number> = championshipTeams.find((c) => c.team.id === team.id)!.racingPositions;
            const numberOfFirstPlaces = racingPositions.filter((pos) => pos === 1).length;
            const numberOfSecondPlaces = racingPositions.filter((pos) => pos === 2).length;
            const numberOfThirdPlaces = racingPositions.filter((pos) => pos === 3).length;

            return {
                team,
                points,
                numberOfFirstPlaces,
                numberOfSecondPlaces,
                numberOfThirdPlaces,
                drivers: teamDrivers,
                racingClassifications: racingPositions
            }
        }).sort(compareTeams)

        if(racingNumber > 1) {
            const prevDriver: Array<ChampionshipDriverTable> = championshipTeams.reduce((prev: Array<ChampionshipDriver>, curr) => {
                return [...prev, ...curr.championshipDrivers];
            }, []).map((championshipDriver) => {
                return {
                    ...championshipDriver,
                    racingPoints: championshipDriver.racingPoints.slice(0, -1),
                    points: championshipDriver.racingPoints.slice(0, -1).reduce((prev, curr) => prev + curr, 0),
                    numberOfFirstPlaces: 0,
                    numberOfSecondPlaces: 0,
                    numberOfThirdPlaces: 0
                }
            }).sort(compareDrivers);

            const prevTeamsTable: Array<ChampionshipTeamTable> = teams.map((team) => {
                const teamDrivers: Array<ChampionshipDriverTable> = prevDriver.filter((driver) => driver.driver.team.id === team.id);
                const points = teamDrivers.reduce((prev, curr) => prev + curr.points, 0);
                const racingPositions: Array<number> = championshipTeams.find((c) => c.team.id === team.id)!.racingPositions;

                return {
                    team,
                    points,
                    numberOfFirstPlaces: 0,
                    numberOfSecondPlaces: 0,
                    numberOfThirdPlaces: 0,
                    drivers: teamDrivers,
                    racingClassifications: racingPositions
                }
            }).sort(compareTeams)

            drivers.forEach((driver, i) => {
                driver.situation = prevDriver.findIndex((prevDriver) => prevDriver.driver.id === driver.driver.id) - i;
            })

            teamsTable.forEach((team, i) => {
                team.situation = prevTeamsTable.findIndex((prevTeam) => prevTeam.team.id === team.team.id) - i;
            })
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <TableTitle title='Drivers' />
                        <ChampionshipTable 
                            descriptionHeader="Driver"
                            showThophyIcon={ status === 'FINISHED' }
                            rows={ drivers.map((driver) => ({
                                points: driver.points,
                                firstPlaces: driver.numberOfFirstPlaces,
                                secondPlaces: driver.numberOfSecondPlaces,
                                thirdPlaces: driver.numberOfThirdPlaces,
                                situation: driver.situation,
                                description: <span 
                                    style={{
                                        color: driver.driver.team.color
                                    }}
                                    >{ driver.driver.name }
                                </span>
                            })) }
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <TableTitle title='Teams' />
                        <ChampionshipTable 
                            descriptionHeader="Team"
                            showThophyIcon={ status === 'FINISHED' }
                            rows={teamsTable.map((team) => ({
                                points: team.points,
                                firstPlaces: team.numberOfFirstPlaces,
                                secondPlaces: team.numberOfSecondPlaces,
                                thirdPlaces: team.numberOfThirdPlaces,
                                situation: team.situation,
                                description: <span 
                                    style={{
                                        color: team.team.color
                                    }}
                                >{ team.team.name }
                                </span>
                            }))}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const compareDrivers = (driverA: ChampionshipDriverTable, driverB: ChampionshipDriverTable): number => {
        if(driverA.points === driverB.points) {
            return compareDriversBasedOnNthRacingPositions(driverA, driverB, 0);
        }
        return driverB.points - driverA.points;
    }

    const compareDriversBasedOnNthRacingPositions = (driverA: ChampionshipDriverTable, driverB: ChampionshipDriverTable, nthPosition: number): number => {
        if(nthPosition >= systemPoints.length) {
            return 0;
        }
        const points = systemPoints[nthPosition];
        const driverANthPositions = driverA.racingPoints.filter((p) => p === points).length;
        const driverBNthPositions = driverB.racingPoints.filter((p) => p === points).length;
        if(driverANthPositions !== driverBNthPositions) {
            return driverBNthPositions - driverANthPositions;
        }
        return compareDriversBasedOnNthRacingPositions(driverA, driverB, nthPosition + 1);
    }

    const compareTeams = (teamA: ChampionshipTeamTable, teamB: ChampionshipTeamTable): number => {
        if(teamA.points === teamB.points) {
            return compareTeamsBasedOnRacingPositions(teamA, teamB, 1);
        }
        return teamB.points - teamA.points;
    }

    const compareTeamsBasedOnRacingPositions = (teamA: ChampionshipTeamTable, teamB: ChampionshipTeamTable, racingPosition: number): number => {
        if(racingPosition > teams.length) return 0;
        const teamANthPositions = teamA.racingClassifications.filter((p) => p === racingPosition).length;
        const teamBNthPositions = teamB.racingClassifications.filter((p) => p === racingPosition).length;
        if(teamANthPositions === teamBNthPositions) {
            return compareTeamsBasedOnRacingPositions(teamA, teamB, racingPosition + 1);
        }
        return teamBNthPositions - teamANthPositions;
    }
  
    const handleGoToNextRacing = () => {
        setStatus('RACING');
        setRacingNumber((prevState) => prevState + 1);
    }

    return <>
        { status === 'NOT_STARTED' && (
            <>
                <TeamCardsContainer teams={teams} />
                <hr />
                <button className="btn btn-primary" onClick={startChampionship}>Start championship</button>
            </>
                
        ) }
        { status === 'RACING' && (
            <>
                <h1 className="mb-3">Racing { racingNumber }/{ numberOfRacings }</h1>
                <Racing 
                    lapSize={lapSize}
                    numberOfLaps={numberOfLaps}
                    systemPoints={systemPoints}
                    teams={[...teams]}
                    setRacingResulst={handleRacingResults}
                />
            </>
        ) }
        { (status === 'SUMMARY' || status === 'FINISHED') && (
            <>
                
                <TeamCardsContainer teams={teams} />    
                <hr />
                { status === 'SUMMARY' ? 
                    <h1 className="mb-3">Championship Classification - Racings {racingNumber}/{numberOfRacings}</h1>
                    :
                    <h1 className="mb-3">Championship Results</h1>
                }
                { status !== 'FINISHED' && (
                    <button className="mb-3 btn btn-primary" onClick={handleGoToNextRacing}>Go to next racing</button>
                ) }
                { driversTable() }
            </>
        ) }
    </>
}

export default Championship;