import Driver from "../../types/Driver";
import CarIcon from "../CarIcon";
import './style.css';

type Props = {
    driver: Driver
}

const DriverCard = ({ driver }: Props) => {

    return (
        <div className="text-center px-2 py-3 car-card">
            <CarIcon color={driver.team.color} />
            <span className="fw-bold d-block" style={{
                color: driver.team.color
            }}>{ driver.name }</span>
        </div>
    );
}

export default DriverCard