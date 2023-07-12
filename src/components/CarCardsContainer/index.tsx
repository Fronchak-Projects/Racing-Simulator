import DriverType from "../../types/DriverType"
import CarCard from "../CarCard";
import './style.css';

type Props = {
    drivers: Array<DriverType>
}

const CarCardsContainer = ({ drivers }: Props) => {

    return (
        <div className="car-cards-container">
            { drivers.map((driver) => <CarCard driver={driver} key={driver.id} />) }
        </div>
    )
}

export default CarCardsContainer;