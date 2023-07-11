import './style.css';

type Props = {
    lapNumber: number;
    size: number;
}

const Lap = ({ lapNumber, size }: Props) => {
    
    return (
        <>
        <tr className="tr-zebra">
            <td></td>
            <td colSpan={size} className="td-zebra"></td>
        </tr>
        <tr>
            <th scope="row" className="lap-label border-none">Lap { lapNumber }</th>
            { new Array(size).fill(1).map((_, index) => <td className="table-dark" key={index}/> ) }
        </tr>
        <tr className="tr-zebra">
            <td></td>
            <td colSpan={size} className="td-zebra"></td>
        </tr>
        </>
    );
}

export default Lap;