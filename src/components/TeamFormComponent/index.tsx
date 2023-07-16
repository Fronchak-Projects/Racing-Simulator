import TeamForm from "../../types/TeamForm";
import CarIcon from "../CarIcon";
import './style.css';

type Props = {
    teamForm: TeamForm
    index: number,
    onTeamFormChange: (nextTeamForm: TeamForm, index: number) => void
}

const TeamFormComponent = ({ teamForm, index, onTeamFormChange }: Props) => {
    
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

    return (
        <div className="container border py-3 rounded-3">
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
                    <i className="bi bi-trash-fill fs-5"></i>
                </div>
                <div className="col-6">
                    <div className="text-center mb-2">
                        <CarIcon color={ teamForm.color } />
                    </div>
                    <input 
                        type="text"
                        className="form-control bg-dark text-white"
                        placeholder="Driver name"
                    />
                </div>
                <div className="col-6">
                    <div className="text-center mb-2">
                    <CarIcon color={ teamForm.color } />
                    </div>
                    <input 
                        type="text"
                        className="form-control bg-dark text-white"
                        placeholder="Driver name"
                    />
                </div>
            </div>
        </div>
    );
}

export default TeamFormComponent;