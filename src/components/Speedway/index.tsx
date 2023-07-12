import React from 'react';
import Lap from '../Lap';
import './style.css';
import CompetitorType from '../../types/CompetitorType';

type Props = {
    numberOfLaps: number;
    lapSize: number;
    competitors: Array<CompetitorType>
}

const Speedway = ({ lapSize, numberOfLaps, competitors }: Props) => {
    return (
        <div className="table-responsive">
            <table className="table table-borderless align-middle" id="speedway-table">
                <thead>
                    <tr>
                        <th scope='col' className="lap-head"></th>
                        { new Array(lapSize).fill(1).map((_, i) => <td scope="col" className="street-head" key={i}></td>) }
                    </tr>
                </thead>
                <tbody>
                    { new Array(numberOfLaps).fill(1).map((_, index) => (
                        <React.Fragment key={index}>
                            <Lap size={lapSize} lapNumber={index + 1} competitors={competitors} />
                            
                            <tr className="row-space"></tr>
                        </React.Fragment>
                    )) }
                </tbody>
            </table>
        </div>
    );
}

export default Speedway;