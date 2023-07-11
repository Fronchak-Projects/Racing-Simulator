import React from 'react';
import Lap from '../Lap';
import './style.css';

type Props = {
    numberOfLaps: number;
    lapSize: number;
}

const Speedway = ({ lapSize, numberOfLaps }: Props) => {

    return (
        <div className="table-responsive">
            <table className="table table-borderless" id="speedway-table">
                <tbody>
                    { new Array(numberOfLaps).fill(1).map((_, index) => (
                        <React.Fragment key={index}>
                            <Lap size={lapSize} lapNumber={index + 1} />
                            
                            <tr className="row-space"></tr>
                        </React.Fragment>
                    )) }

                </tbody>
            </table>
        </div>
    );
}

export default Speedway;