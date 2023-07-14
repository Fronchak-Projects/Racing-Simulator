import Team from "./Team"

type RacingTeam = {
    team: Team,
    points: number;
    position: number | undefined;
}

export default RacingTeam;