type Props = {
    position: 1 | 2 | 3;
}

const TrophyIcon = ({ position }: Props) => {
    return (
        <i 
            className={`fa-solid fa-trophy ${position == 1 ? 'gold-color' : position == 2 ? 'silver-color' : 'bronze-color'}`}    
        ></i> 
    );
}

export default TrophyIcon;