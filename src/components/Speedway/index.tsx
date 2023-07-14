import React from 'react';
import Lap from '../Lap';
import './style.css';
import RacingDriver from '../../types/RacingDriver';

type Props = {
    numberOfLaps: number;
    lapSize: number;
    racingDrivers: Array<RacingDriver>
}

const Speedway = ({ lapSize, numberOfLaps, racingDrivers }: Props) => {
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
                        racingDrivers.some((racingDriver) => racingDriver.actualPosition <= (index + 1) * lapSize))  ?
                            <React.Fragment key={index}>
                                <Lap size={lapSize} lapNumber={index + 1} racingDrivers={racingDrivers} />
                                
                                <tr className="row-space"></tr>
                            </React.Fragment>
                            :
                            <React.Fragment key={index}></React.Fragment>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Speedway;