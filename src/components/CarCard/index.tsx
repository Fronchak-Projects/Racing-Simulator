import DriverType from "../../types/DriverType";
import CarIcon from "../CarIcon";
import './style.css';

type Props = {
    driver: DriverType
}

const CarCard = ({ driver }: Props) => {

    return (
        <div className="text-center px-2 py-3 car-card">
            <CarIcon color={driver.team.color} />
            <span className="fw-bold d-block">{ driver.name }</span>
        </div>
    );
}

export default CarCard