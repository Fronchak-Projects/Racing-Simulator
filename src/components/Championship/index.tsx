import { useState } from 'react';
import Team from "../../types/Team";
import ChampionshipTeam from '../../types/ChampionshipTeam';
import ChampionshipStatus from '../../types/ChampionshipStatus';
import TeamCardsContainer from '../TeamCardsContainer';
import Racing from '../Racing';
import Driver from '../../types/Driver';
import RacingPoints from '../../types/RacingPoints';
import ChampionshipDriver from '../../types/ChampionshipDriver';
import TrophyIcon from '../TrophyIcon';
import TableTitle from '../TableTitle';
import './style.css';
import TeamRacingClassification from '../../types/TeamRacingClassification';

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

    const hasFinished = racingNumber === numberOfRacings;

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
        if(hasFinished) {
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
        }).sort((a, b) => {
            if(a.points === b.points) {
                const racingAWons = a.racingPoints.filter((p) => p === systemPoints[0]).length;
                const racingBWons = b.racingPoints.filter((p) => p === systemPoints[0]).length;
                return racingBWons - racingAWons;
            }
            return b.points - a.points
        });

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
                drivers: teamDrivers
            }
        }).sort((teamA, teamB) => {
            return teamB.points - teamA.points;
        })

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
            }).sort((a, b) => {
                if(a.points === b.points) {
                    const racingAWons = a.racingPoints.filter((p) => p === systemPoints[0]).length;
                    const racingBWons = b.racingPoints.filter((p) => p === systemPoints[0]).length;
                    return racingBWons - racingAWons;
                }
                return b.points - a.points
            });

            const prevTeamsTable: Array<ChampionshipTeamTable> = teams.map((team) => {
                const teamDrivers: Array<ChampionshipDriverTable> = prevDriver.filter((driver) => driver.driver.team.id === team.id);
                const points = teamDrivers.reduce((prev, curr) => prev + curr.points, 0);
    
                return {
                    team,
                    points,
                    numberOfFirstPlaces: 0,
                    numberOfSecondPlaces: 0,
                    numberOfThirdPlaces: 0,
                    drivers: teamDrivers
                }
            }).sort((teamA, teamB) => {
                return teamB.points - teamA.points;
            })

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
                        <table className="table table-dark align-middle table-striped table-sm my-table">
                            <thead className="align-middle">
                                <tr>
                                    <th scope="col" >Classificação</th>
                                    <th scope="col" className="description-header">Driver</th>
                                    <th scope="col">Pontuação</th>
                                    <th scope="col">
                                        <TrophyIcon position={1} />
                                    </th>
                                    <th scope="col">
                                        <TrophyIcon position={2} />
                                    </th>
                                    <th scope="col">
                                        <TrophyIcon position={3} />
                                    </th>
                                    <th scope="col">Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                { drivers.map((driver, i) => (
                                    <tr key={i}>
                                        <td>
                                            { (status === 'FINISHED' && (i < 3)) ?
                                                <TrophyIcon position={i + 1 as 1 | 2 | 3} />
                                                :
                                                `${i + 1}°`
                                            }
                                        </td>
                                        <td className="description-cell">
                                            <div>
                                                <span 
                                                    style={{
                                                        color: driver.driver.team.color
                                                    }}
                                                    >{ driver.driver.name }
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            { driver.points }
                                        </td>
                                        <td> 
                                            { driver.numberOfFirstPlaces ? driver.numberOfFirstPlaces : '-' }
                                        </td>
                                        <td> 
                                            { driver.numberOfSecondPlaces ? driver.numberOfSecondPlaces : '-' }
                                        </td>
                                        <td > 
                                            { driver.numberOfThirdPlaces ? driver.numberOfThirdPlaces : '-' }
                                        </td>
                                        <td>
                                            <div className="situation-container">
                                            {
                                                driver.situation ?
                                                    driver.situation > 0 ?
                                                        <>
                                                            <i className="bi bi-caret-up-fill text-success"></i>
                                                            <span className="text-success">{ driver.situation }</span>
                                                        </>
                                                        :
                                                        <>
                                                            <i className="bi bi-caret-down-fill text-danger"></i>
                                                            <span className="text-danger">{ -1 * driver.situation }</span>
                                                        </>
                                                :
                                                '-'
                                            }
                                            </div>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 col-lg-6">
                        <TableTitle title='Teams' />
                        <table className="table table-dark align-middle table-striped table-sm my-table">
                            <thead className="align-middle">
                                <tr>
                                    <th scope="col">Classificação</th>
                                    <th scope="col" className="description-header">Team</th>
                                    <th scope="col">Pontuação</th>
                                    <th scope="col">
                                        <TrophyIcon position={1} />
                                    </th>
                                    <th scope="col">
                                        <TrophyIcon position={2} />
                                    </th>
                                    <th scope="col">
                                        <TrophyIcon position={3} />
                                    </th>
                                    <th scope="col">Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                { teamsTable.map((team, i) => (
                                    <tr key={i}>
                                        <td>
                                            { (status === 'FINISHED' && i < 3) ?
                                                <TrophyIcon position={i + 1 as 1 | 2 | 3} />
                                                :
                                                `${i + 1}°`
                                            }
                                        </td>
                                        <td className="description-cell">
                                            <span 
                                                style={{
                                                    color: team.team.color
                                                }}
                                            >{ team.team.name }
                                            </span>
                                        </td>
                                        <td>
                                            { team.points }
                                        </td>
                                        <td>
                                            { team.numberOfFirstPlaces ? team.numberOfFirstPlaces : '-' }
                                        </td>
                                        <td>
                                            { team.numberOfSecondPlaces ? team.numberOfSecondPlaces : '-' }
                                        </td>
                                        <td>
                                            { team.numberOfThirdPlaces ? team.numberOfThirdPlaces : '-' }
                                        </td>
                                        <td >
                                            <div className="situation-container">
                                            {
                                                team.situation ?
                                                    team.situation > 0 ?
                                                        <>
                                                            <i className="bi bi-caret-up-fill text-success"></i>
                                                            <span className="text-success">{ team.situation }</span>
                                                        </>
                                                        :
                                                        <>
                                                            <i className="bi bi-caret-down-fill text-danger"></i>
                                                            <span className="text-danger">{ -1 * team.situation }</span>
                                                        </>
                                                :
                                                '-'
                                            }
                                            </div>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
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