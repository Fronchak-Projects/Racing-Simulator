import RacingDriver from '../../types/RacingDriver';
import CarIcon from '../CarIcon';
import './style.css';

type Props = {
    lapNumber: number;
    size: number;
    competitors: Array<RacingDriver>
}

const Lap = ({ lapNumber, size, competitors }: Props) => {
    
    return (
        <>
            <tr className="tr-zebra">
                <td></td>
                <td colSpan={size} className="td-zebra"></td>
            </tr>
            <tr>
                <th scope="row" className="lap-label border-none">Lap { lapNumber }</th>
                { new Array(size).fill(1).map((_, index) => {
                    const length = (size * (lapNumber - 1)) + 1 + index;
                    const competitor = competitors.find((competitor) => competitor.actualPosition === length);
                    return (
                        <td 
                            className="table-dark text-center p-0 td-lap" 
                            key={index}
                        >
                            { competitor && <CarIcon color={competitor.driver.team.color} /> }
                        </td>
                    )
                } ) }
            </tr>
            <tr className="tr-zebra">
                <td></td>
                <td colSpan={size} className="td-zebra"></td>
            </tr>
        </>
    );
}

export default Lap;