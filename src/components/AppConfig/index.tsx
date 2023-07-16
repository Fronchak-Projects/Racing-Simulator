type Props = {
    numberOfRacings: number;
    numberOfLaps: number;
    lapLength: number;
    speed: number;
    onNumberOfRacingsChange: (nextNumberOfRacings: number) => void;
    onNumberOfLapsChange: (nextNumberOfLaps: number) => void;
    onLapLengthChange: (nextLapLength: number) => void;
    onSpeedChange: (nextSpeed: number) => void;
}

const AppConfig = ({ 
        numberOfRacings, onNumberOfRacingsChange,
        numberOfLaps, onNumberOfLapsChange,
        lapLength, onLapLengthChange,
        speed, onSpeedChange
    }: Props) => {
    
    const handleNumberOfRacingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextNumberOfRacings = Number.parseInt(event.target.value);
        if(!Number.isNaN(nextNumberOfRacings)) {
            onNumberOfRacingsChange(nextNumberOfRacings);
        }
    }

    const handleNumberOfLapsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextNumberOfLaps = Number.parseInt(event.target.value);
        if(!Number.isNaN(nextNumberOfLaps)) {
            onNumberOfLapsChange(nextNumberOfLaps);
        }
    }

    

    return (
        <div className="container-fluid p-3 bg-dark text-white">
            <h2 className="mb-3">Configurations</h2>
            <div className="row">
            <div className="col-6 col-md-2">
                <div className="mb-3">
                    <label htmlFor="number-of-racings" className="form-label">Number of racings</label>
                    <div className="input-group">   
                        <input 
                            id="number-of-racings"
                            type="number" 
                            className="form-control bg-dark text-white" 
                            aria-label="Number of racings" 
                            aria-describedby="number-of-racings-addon"
                            value={numberOfRacings}
                            onChange={handleNumberOfRacingsChange} 
                        />
                        <span className="input-group-text" id="number-of-racings-addon">Racings</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="number-of-laps" className="form-label">Number of laps</label>
                    <div className="input-group">
                        <input 
                            id="number-of-laps"
                            type="number"
                            className="form-control bg-dark text-white"
                            aria-label="Number of laps"
                            aria-describedby="number-of-laps-addon"
                        />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default AppConfig;