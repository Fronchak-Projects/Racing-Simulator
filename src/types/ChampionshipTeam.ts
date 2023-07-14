import ChampionshipDriver from "./ChampionshipDriver";
import Team from "./Team"

type ChampionshipTeam = {
    team: Team,
    championshipDrivers: Array<ChampionshipDriver>
}

export default ChampionshipTeam;