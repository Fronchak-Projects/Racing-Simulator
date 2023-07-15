import { useState } from 'react';
import Team from "../../types/Team";
import ChampionshipTeam from '../../types/ChampionshipTeam';
import ChampionshipStatus from '../../types/ChampionshipStatus';
import TeamCardsContainer from '../TeamCardsContainer';
import Racing from '../Racing';
import Driver from '../../types/Driver';
import RacingPoints from '../../types/RacingPoints';
import ChampionshipDriver from '../../types/ChampionshipDriver';
import CarIcon from '../CarIcon';
import './style.css';

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
    racingPoints: Array<number>;
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
            }))
        }))
    );

    const startChampionship = () => {
        setStatus('RACING');
        setRacingNumber(1);
    }

    const setRacingPoints = (points: Array<RacingPoints>) => {
        const nextChampionshipTeams: Array<ChampionshipTeam> = championshipTeams.map((championshipTeam) => {
            return {
                team: championshipTeam.team,
                championshipDrivers: championshipTeam.championshipDrivers.map((championshipDriver) => {
                    const racingPoints = points.find((p) => p.driver.id === championshipDriver.driver.id)?.points ?? 0;
                    return {
                        ...championshipDriver,
                        racingPoints: [...championshipDriver.racingPoints, racingPoints]
                    }
                })
            }
        });
        setChampionShipTeams(nextChampionshipTeams);
        setStatus('SUMMARY');

    }

    const driversTable = () => {
        const drivers: Array<ChampionshipDriverTable> = championshipTeams.reduce((prev: Array<ChampionshipDriver>, curr) => {
            return [...prev, ...curr.championshipDrivers]
        }, []).map((championshipDriver) => {
            return {
                ...championshipDriver,
                points: championshipDriver.racingPoints.reduce((prev, curr) => prev + curr, 0)
            }
        }).sort((a, b) => {
            if(a.points === b.points) {
                const racingAWons = a.racingPoints.filter((p) => p === systemPoints[0]).length;
                const racingBWons = b.racingPoints.filter((p) => p === systemPoints[0]).length;
                return racingBWons - racingAWons;
            }
            return b.points - a.points
        });

        if(racingNumber > 1) {
            const prevDriver: Array<ChampionshipDriverTable> = championshipTeams.reduce((prev: Array<ChampionshipDriver>, curr) => {
                return [...prev, ...curr.championshipDrivers];
            }, []).map((championshipDriver) => {
                return {
                    ...championshipDriver,
                    racingPoints: championshipDriver.racingPoints.slice(0, -1),
                    points: championshipDriver.racingPoints.slice(0, -1).reduce((prev, curr) => prev + curr, 0)
                }
            }).sort((a, b) => {
                if(a.points === b.points) {
                    const racingAWons = a.racingPoints.filter((p) => p === systemPoints[0]).length;
                    const racingBWons = b.racingPoints.filter((p) => p === systemPoints[0]).length;
                    return racingBWons - racingAWons;
                }
                return b.points - a.points
            });

            drivers.forEach((driver, i) => {
                driver.situation = prevDriver.findIndex((prevDriver) => prevDriver.driver.id === driver.driver.id) - i;
            })
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <table className="table table-dark align-middle table-striped">
                            <thead className="table-primary">
                                <tr>
                                    <th scope="col" className="classification-column">Classificação</th>
                                    <th scope="col">Driver</th>
                                    <th scope="col" className="pontuation-column">Pontuação</th>
                                    <th scope="col" className="situation-column">Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                { drivers.map((driver, i) => (
                                    <tr key={i}>
                                        <td className="text-center classification-position">{ i + 1}</td>
                                        <td>
                                            <div className="d-flex align-center">
                                                <CarIcon color={driver.driver.team.color} />
                                                <span 
                                                    style={{
                                                        color: driver.driver.team.color
                                                    }}
                                                    className="mx-4">{ driver.driver.name }
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-center classification-pontuation">
                                            { driver.points }
                                        </td>
                                        <td className="text-center">
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
                <h1 className="mb-3">Championship Teams</h1>
                <TeamCardsContainer teams={teams} />
                <button className="btn btn-primary mt-3" onClick={startChampionship}>Start championship</button>
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
                    setRacingPoints={setRacingPoints}
                />
            </>
        ) }
        { (status === 'SUMMARY' || status === 'FINISHED') && (
            <>
                <h1 className="mb-3">Championship Classification</h1>
                { status !== 'FINISHED' && (
                    <button className="mb-3 btn btn-primary" onClick={handleGoToNextRacing}>Go to next racing</button>
                ) }
                { driversTable() }
            </>
        ) }
    </>
}

export default Championship;