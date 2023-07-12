import DriverType from "../../types/DriverType";
import './style.css';

type Props = {
    driver: DriverType
}

const CarCard = ({ driver }: Props) => {

    return (
        <div className="text-center px-2 py-3 car-card">
            <i 
                className="fa-solid fa-car-side mb-3"
                style={{
                    color: driver.color
                }}
            ></i>
            <span className="fw-bold d-block">{ driver.name }</span>
        </div>
    );
}

export default CarCard