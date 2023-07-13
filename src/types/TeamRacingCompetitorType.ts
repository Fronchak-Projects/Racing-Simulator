import TeamType from "./TeamType"

type TeamRacingCompetitor = {
    team: TeamType,
    points: number;
    position: number | undefined;
}

export default TeamRacingCompetitor;