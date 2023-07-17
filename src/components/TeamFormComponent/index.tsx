import TeamForm from "../../types/TeamForm";
import CarIcon from "../CarIcon";
import './style.css';

type Props = {
    teamForm: TeamForm
    index: number,
    onTeamFormChange: (nextTeamForm: TeamForm, index: number) => void,
    onDelete: (index: number) => void
}

const TeamFormComponent = ({ teamForm, index, onTeamFormChange, onDelete }: Props) => {
    
    const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextTeamForm: TeamForm = {
            ...teamForm,
            'name': event.target.value
        }
        onTeamFormChange(nextTeamForm, index);
    }
    
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextTeamForm: TeamForm = {
            ...teamForm,
            'color': event.target.value
        }
        onTeamFormChange(nextTeamForm, index);
    }

    const handleDriverChange = (event: React.ChangeEvent<HTMLInputElement>, driverIndex: number) => {
        const nextTeamForm: TeamForm = {
            ...teamForm,
            'drivers': [
                ...teamForm.drivers.slice(0, driverIndex),
                event.target.value,
                ...teamForm.drivers.slice(driverIndex + 1)
            ]
        }
        onTeamFormChange(nextTeamForm, index)
    }

    return (
        <div className="p-3 rounded-3" style={{
            border: `2px solid ${teamForm.color}`
        }}>
            <div className="row g-2 gy-4">
                <div className="col-9">
                    <input 
                        type="text"
                        className="form-control bg-dark text-white"
                        placeholder="Team name"
                        value={teamForm.name}
                        onChange={handleTeamChange}
                    />
                </div>
                <div className="col-2">
                    <input 
                        type="color"
                        className="form-control form-control-color w-100 bg-dark"
                        title="Choose the team color"
                        value={teamForm.color}
                        onChange={handleColorChange}
                    />
                </div>
                <div className="col-1 text-end">
                    <i className="bi bi-trash-fill fs-5" onClick={() => onDelete(index)}></i>
                </div>
                <div className="drivers-form-container">
                    { teamForm.drivers.map((driver, driverIndex) => (
                        <div className="driver-form-container" key={driverIndex}>
                            <div className="text-center mb-2">
                                <CarIcon color={ teamForm.color } />
                            </div>
                            <input 
                                type="text"
                                className="form-control bg-dark text-white"
                                placeholder="Driver name"
                                value={driver}
                                onChange={(e) => handleDriverChange(e, driverIndex)}
                            />
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}

export default TeamFormComponent;