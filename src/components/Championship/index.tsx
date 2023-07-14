import { useState } from 'react';
import Team from "../../types/Team";
import ChampionshipTeam from '../../types/ChampionshipTeam';
import ChampionshipStatus from '../../types/ChampionshipStatus';
import TeamCardsContainer from '../TeamCardsContainer';

type Props = {
    numberOfRacings: number;
    numberOfLaps: number;
    lapSize: number;
    teams: Array<Team>;
    systemPoints: Array<number>;
}

const Championship = ({ numberOfRacings, numberOfLaps, lapSize, teams, systemPoints }: Props) => {

    const [status, setStatus] = useState<ChampionshipStatus>('NOT_STARTED');
    const [championshipTeams, setChampionShipTeams] = useState<Array<ChampionshipTeam>>(() => teams
        .map((team) => ({
            team: team,
            championshipDrivers: team.drivers.map((driver) => ({
                driver: driver,
                racingPoints: []
            }))
        }))
    )

    return <>
        <TeamCardsContainer teams={teams} />
    </>
}

export default Championship;