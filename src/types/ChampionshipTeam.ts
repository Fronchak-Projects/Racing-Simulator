import ChampionshipDriver from "./ChampionshipDriver";
import Team from "./Team"

type ChampionshipTeam = {
    team: Team,
    championshipDrivers: Array<ChampionshipDriver>,
    racingPositions: Array<number>
}

export default ChampionshipTeam;