import Driver from "../../types/Driver"
import DriverCard from "../DriverCard";
import './style.css';

type Props = {
    drivers: Array<Driver>
}

const DriverCardsContainer = ({ drivers }: Props) => {

    return (
        <div className="car-cards-container">
            { drivers.map((driver) => <DriverCard driver={driver} key={driver.id} />) }
        </div>
    )
}

export default DriverCardsContainer;