import Team from "../../types/Team";
import TeamCard from "../TeamCard";
import './style.css';

type Props = {
    teams: Array<Team>
}

const TeamCardsContainer = ({ teams }: Props) => {

    return (
        <div className="team-cards-container">
            { teams.map((team) => <TeamCard team={team} key={team.id} />) }
        </div>
    );
}

export default TeamCardsContainer;