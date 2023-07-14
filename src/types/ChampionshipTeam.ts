import Team from "./Team"

type ChampionshipTeam = {
    team: Team,
    lastPosition?: number;
    position?: number;
    lastPoints: number;
    points: number;
}

export default ChampionshipTeam;