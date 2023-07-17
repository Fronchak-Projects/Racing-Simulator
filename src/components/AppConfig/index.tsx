import TeamForm from "../../types/TeamForm";
import TeamFormComponent from "../TeamFormComponent";
import formula1Teams from '../../utils/TeamsData/formulaOneTeams';
import europeTeams from '../../utils/TeamsData/europeTeams'
import './style.css';

type Props = {
    numberOfRacings: number;
    numberOfLaps: number;
    lapLength: number;
    speed: number;
    numberOfDriversPerTeam: number;
    teams: Array<TeamForm>
    onNumberOfRacingsChange: (nextNumberOfRacings: number) => void;
    onNumberOfLapsChange: (nextNumberOfLaps: number) => void;
    onLapLengthChange: (nextLapLength: number) => void;
    onSpeedChange: (nextSpeed: number) => void;
    onNumberOfDriversPerTeamChange: (nextNumberOfDriversPerTeam: number) => void;
    onTeamChange: (nextTeam: TeamForm, index: number) => void;
    onAddTeam: () => void,
    onRemoveTeam: (index: number) => void,
    setTeams: (nextTeams: Array<TeamForm>) => void
}

const AppConfig = ({ 
        numberOfRacings, onNumberOfRacingsChange,
        numberOfLaps, onNumberOfLapsChange,
        lapLength, onLapLengthChange,
        speed, onSpeedChange,
        numberOfDriversPerTeam, onNumberOfDriversPerTeamChange,
        teams, onTeamChange,
        onAddTeam, onRemoveTeam,
        setTeams
    }: Props) => {
    
    const handleNumberOfRacingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextNumberOfRacings = Number.parseInt(event.target.value);
        if(!Number.isNaN(nextNumberOfRacings) && nextNumberOfRacings > 0) {
            onNumberOfRacingsChange(nextNumberOfRacings);
        }
    }

    const handleNumberOfLapsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextNumberOfLaps = Number.parseInt(event.target.value);
        if(!Number.isNaN(nextNumberOfLaps && nextNumberOfLaps > 0)) {
            onNumberOfLapsChange(nextNumberOfLaps);
        }
    }

    const handleLapLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextLapLength = Number.parseInt(event.target.value);
        if(!Number.isNaN(nextLapLength) && nextLapLength > 0) {
            onLapLengthChange(nextLapLength);
        }
    }

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextSpeed = Number.parseInt(event.target.value);
        if(!Number.isNaN(nextSpeed) && nextSpeed >= 100) {
            onSpeedChange(nextSpeed);
        }
    }

    const handleNumberOfDriversPerTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextNumberOfDriversPerTeam = Number.parseInt(event.target.value);
        if(!Number.isNaN(nextNumberOfDriversPerTeam) && nextNumberOfDriversPerTeam >= 1) {
            onNumberOfDriversPerTeamChange(nextNumberOfDriversPerTeam);
        }
    }

    return (
        <div className="container-fluid p-3 bg-dark text-white">
            <h2 className="mb-3">Configurations</h2>
            <div className="row">
                <div className="col-6 col-md-3">
                    <div className="mb-3">
                        <label htmlFor="number-of-racings" className="form-label">Number of racings</label>
                        <div className="input-group">   
                            <input 
                                id="number-of-racings"
                                type="number" 
                                step={1}
                                min={1}
                                className="form-control bg-dark text-white" 
                                aria-label="Number of racings" 
                                aria-describedby="number-of-racings-addon"
                                value={numberOfRacings}
                                onChange={handleNumberOfRacingsChange} 
                            />
                            <span className="input-group-text" id="number-of-racings-addon">racings</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="mb-3">
                        <label htmlFor="number-of-laps" className="form-label">Number of laps</label>
                        <div className="input-group">
                            <input 
                                id="number-of-laps"
                                type="number"
                                step={1}
                                min={1}
                                className="form-control bg-dark text-white"
                                aria-label="Number of laps"
                                aria-describedby="number-of-laps-addon"
                                value={numberOfLaps}
                                onChange={handleNumberOfLapsChange}
                            />
                            <span className="input-group-text" id="number-of-laps-addon">laps</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-2">
                    <div className="mb-3">
                        <label htmlFor="lap-length" className="form-label">Lap length</label>
                        <div className="input-group">
                            <input 
                                id="lap-length"
                                type="number"
                                step={5}
                                min={1}
                                className="form-control bg-dark text-white"
                                aria-label="Lap length"
                                aria-describedby="lap-length-addon"
                                value={lapLength}
                                onChange={handleLapLengthChange}
                            />
                            <span className="input-group-text" id="lap-length-addon">km</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-2">
                    <div className="mb-3">
                        <label htmlFor="speed" className="form-label">Speed</label>
                        <div className="input-group">
                            <input 
                                id="speed"
                                type="number"
                                step={100}
                                min={100}
                                className="form-control bg-dark text-white"
                                aria-label="speed"
                                aria-describedby="speed-addon"
                                value={speed}
                                onChange={handleSpeedChange}
                            />
                            <span className="input-group-text" id="speed-addon">ms</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-2">
                    <div className="mb-3">
                        <label htmlFor="drivers-per-team" className="form-label">Drivers per team</label>
                        <div className="input-group">
                            <input 
                                id="drivers-per-team"
                                type="number"
                                step={1}
                                min={1}
                                className="form-control bg-dark text-white"
                                aria-label="drivers per team"
                                aria-describedby="number-of-drivers-per-team-addon"
                                value={numberOfDriversPerTeam}
                                onChange={handleNumberOfDriversPerTeamChange}
                            />
                            <span className="input-group-text" id="number-of-drivers-per-team-addon">
                                { numberOfDriversPerTeam === 1 ? 'driver' : 'drivers' }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="mb-3">Configure the teams</h2>
            <div className="mb-3">
                <button className="btn btn-primary me-2"
                    onClick={() => setTeams(formula1Teams)}
                >Use F1 teams</button>
                <button className="btn btn-primary me-2">Use BR Football teams</button>
                <button className="btn btn-primary me-2"
                    onClick={() => setTeams(europeTeams)}
                >Use EU Football teams</button>
            </div>
            <div className="teams-form-container">
                { teams.map((team, index) => (
                    <div className="team-form-container" key={index}>
                        <TeamFormComponent 
                            teamForm={team}
                            index={index}
                            onTeamFormChange={onTeamChange}
                            onDelete={onRemoveTeam}
                        />
                    </div>
                )) }
                <div className="team-form-container add-container">
                    <i className="bi bi-plus-circle" onClick={onAddTeam}></i>
                </div>
            </div>
        </div>
    );
}

export default AppConfig;