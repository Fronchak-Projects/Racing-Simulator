type Props = {
    title: string
}

const TableTitle = ({ title }: Props) => {
    return (
        <h2 className="mb-0 py-3 text-center bg-dark text-white fw-bold border-bottom border-3">{ title }</h2>
    );
}

export default TableTitle;