import TrophyIcon from "../TrophyIcon";
import './style.css';

type Props = {
    descriptionHeader: string;
    classifications: Array<{
        classification: number;
        description: React.ReactNode;
        pontuation?: number
    }>
}

const ClassificationTable = ({ descriptionHeader, classifications }: Props) => {
    return (
        <table className="table table-dark align-middle table-striped classification-table">
            <thead className="table-primary">
                <tr>
                    <th scope="col" className="classification-column">Classificação</th>
                    <th scope="col">{ descriptionHeader }</th>
                    <th scope="col" className="pontuation-column">Pontuação</th>
                </tr>

            </thead>
            <tbody className="table-group-divider">
                { classifications.sort((a, b) => a.classification - b.classification).map((classification, i) => (
                    <tr key={i}>
                        <td className="text-center">
                            { classification.classification < 4 ? 
                                <TrophyIcon position={classification.classification as 1 | 2 | 3} /> 
                                : 
                                <span className="classification-position">{classification.classification}°</span>
                            }
                        </td>
                        <td>{ classification.description }</td>
                        <td className="text-center">{ classification.pontuation ? 
                            <span className="text-success classification-pontuation">+ { classification.pontuation }</span> 
                            : '-' 
                            }
                        </td>
                    </tr>
                )) }
            </tbody>
        </table>
    );
}

export default ClassificationTable;