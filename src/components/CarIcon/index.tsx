type Props = {
    color: string;
}

const CarIcon = ({ color }: Props) => {
    return (
        <i 
            className="fa-solid fa-car-side"
            style={{
                color: color
            }}
        ></i> 
    );
}

export default CarIcon;