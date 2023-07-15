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
        <table className="table table-dark align-middle table-striped classification-table">
            <thead className="table-primary">
                <tr>
                    <th scope="col" className="classification-column">Classificação</th>
                    <th scope="col">{ descriptionHeader }</th>
                    <th scope="col" className="pontuation-column">Pontuação</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                { classificationItens.sort((a, b) => a.classification - b.classification).map((item, i) => (
                    <tr key={i}>
                        <td className="text-center">
                            { item.classification < 4 ? 
                                <TrophyIcon position={item.classification as 1 | 2 | 3} /> 
                                : 
                                <span className="classification-position">{item.classification}°</span>
                            }
                        </td>
                        <td>{ item.description }</td>
                        <td className="text-center">{ item.pontuation ? 
                            <span className="text-success classification-pontuation">+ { item.pontuation }</span> 
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