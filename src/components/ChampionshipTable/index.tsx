import React from 'react';
import TrophyIcon from '../TrophyIcon';
import './style.css';

type Row = {
    description: React.ReactNode;
    points: number;
    firstPlaces: number;
    secondPlaces: number;
    thirdPlaces: number;
    situation?: number;
}

type Props = {
    descriptionHeader: React.ReactNode;
    showThophyIcon: boolean;
    rows: Array<Row>;

}

const ChampionshipTable = ({ descriptionHeader, showThophyIcon, rows }: Props) => {

    return (
    <table className="table table-dark align-middle table-striped table-sm my-table">
        <thead className="align-middle">
            <tr>
                <th scope="col" >Classificação</th>
                <th scope="col" className="description-header">{ descriptionHeader }</th>
                <th scope="col">Pontuação</th>
                <th scope="col">
                    <TrophyIcon position={1} />
                </th>
                <th scope="col">
                    <TrophyIcon position={2} />
                </th>
                <th scope="col">
                    <TrophyIcon position={3} />
                </th>
                <th scope="col">Situação</th>
            </tr>
        </thead>
        <tbody>
            { rows.map((row, i) => (
                <tr key={i}>
                    <td>
                        { (showThophyIcon && (i < 3)) ?
                            <TrophyIcon position={i + 1 as 1 | 2 | 3} />
                            :
                            `${i + 1}°`
                        }
                    </td>
                    <td className="description-cell">{ row.description }</td>
                    <td>{ row.points }</td>
                    <td>{ row.firstPlaces }</td>
                    <td>{ row.secondPlaces }</td>
                    <td >{ row.thirdPlaces }</td>
                    <td>
                        <div className="situation-container">
                        {
                            row.situation ?
                                row.situation > 0 ?
                                    <>
                                        <i className="bi bi-caret-up-fill text-success"></i>
                                        <span className="text-success">{ row.situation }</span>
                                    </>
                                    :
                                    <>
                                        <i className="bi bi-caret-down-fill text-danger"></i>
                                        <span className="text-danger">{ -1 * row.situation }</span>
                                    </>
                            :
                            '-'
                        }
                        </div>
                    </td>
                </tr>
            )) }
        </tbody>
    </table>
    );
}

export default ChampionshipTable;