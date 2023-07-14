import Team from "../../types/Team";
import DriverCard from "../DriverCard";
import './style.css';

type Props = {
    team: Team;
}

const TeamCard = ({ team }: Props) => {

    return (
        <div className="team-card-container pt-2 px-3" style={{
            borderColor: team.color
        }}>
            <span className="badge" style={{
                backgroundColor: team.color
            }}>{ team.name }</span>
            <div className="team-drivers-container">
                { team.drivers.map((driver) => <DriverCard driver={driver} key={driver.id} />) }
            </div>
        </div>
    );
}

export default TeamCard