import TrophyIcon from "../TrophyIcon";

type Props = {
    descriptionHeader: string;
    classificationItens: Array<{
        classification: number;
        description: React.ReactNode;
        pontuation?: number
    }>
}

const ClassificationTable = ({ descriptionHeader, classificationItens }: Props) => {
    return (
        <table className="table table-dark table-striped table-sm my-table">
            <thead className="align-middle">
                <tr>
                    <th scope="col">Classificação</th>
                    <th scope="col" className="description-header">{ descriptionHeader }</th>
                    <th scope="col">Pontuação</th>
                </tr>
            </thead>
            <tbody>
                { classificationItens.sort((a, b) => a.classification - b.classification).map((item, i) => (
                    <tr key={i}>
                        <td>
                            { item.classification < 4 ? 
                                <TrophyIcon position={item.classification as 1 | 2 | 3} /> 
                                : 
                                <span className="classification-position">{item.classification}°</span>
                            }
                        </td>
                        <td className="description-cell">{ item.description }</td>
                        <td>{ item.pontuation ? 
                            <span className="text-success">+ { item.pontuation }</span> 
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