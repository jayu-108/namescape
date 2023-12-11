import DataTable from "react-data-table-component"

function ResultTable({data, columns}) {

    const customStyles = {
        table: {
            style: {
                border: '1px blue',
            },
        },
        headRow: {
            style: {
                backgroundColor: 'lightblue',

            },
        },
        headCells: {
            style: {
                borderBottom: '1px solid #ccc',
                borderRight: '1px solid #ccc',
                borderLeft: '1px solid #ccc'
            },
        },
        cells: {
            style: {
                borderRight: '1px solid #ccc',
                borderLeft: '1px solid #ccc',
                borderBottom: '1px solid #ccc',
            },
        },
    }

    return (
        <>
            <DataTable columns={columns} data={data} customStyles={customStyles} pagination showGridlines
            />
        </>
    )
}

export default ResultTable