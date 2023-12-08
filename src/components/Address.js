import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Select from 'react-select';

function Namescape() {
    // var data;
    let isEmpty = false;
    let [data, setData] = useState('')
    const [searchquery, setSearchQuery] = useState('');

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
    const onChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://10.208.10.70:5000/searchaddress', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ queryA: searchquery })
            })

            const json = await response.json();
            if (json.success) {
                isEmpty = true;
                setData(json.address.map((element) => {
                    // console.log(element.name)
                    return {
                        address: element.address,
                        vernacular_address: element.vernacular_address
                    }
                }))
            }
        } catch (error) {
            // console.error(error.message);
            console.log("Server Down");
            // res.status(500).send("Internal Server Error")
        }

    }

    const columns = [
        {
            name: 'Address',
            selector: row => row.address,
        },
        {
            name: 'Vernacular Address',
            selector: row => row.vernacular_address,
        }
    ]

    return (
        <>
            <div>
                <div className="container-md">
                    <div className="container">
                        <header className="d-flex justify-content-center py-3" style={{ backgroundColor: "#154063" }}>
                            <ul className="nav nav-pills">
                                <li className="nav-item"><img src='https://gisttransserver.in/assets/img/logo.svg' alt='cdac-logo' style={{ height: "100px", width: "100px" }}></img></li>
                                <li className="nav-item"><h1 className='mx-2 mt-3' style={{ color: "white" }}>CDAC Name & Address Search</h1></li>
                            </ul>
                        </header>
                    </div>
                    <form>
                        <div className="container">
                            <header className="d-flex justify-content-center py-3">
                                <ul className="nav nav-pills">
                                    <li className="nav-item mx-2 mt-1">Query :</li>
                                    <li className="nav-item">
                                        <div >
                                            <input name="searchquery" id="searchquery" onChange={onChange} style={{ height: "36px", borderColor: "black", borderRadius: "4px", borderStyle: "solid", borderWidth: "1px" }} />
                                        </div></li>
                                    <li className="nav-item">
                                        <div>
                                            {<button className="btn btn-md mx-2 " onClick={handleClick} type='submit' style={{ background:"#154063", color: "white"}}>Search</button>}
                                        </div>
                                    </li>
                                </ul>
                            </header>
                        </div>
                    </form>
                    <div className="row" >
                        <div className="col"></div>
                        <div className="col-10 mt-1" >
                            {!isEmpty ? (<DataTable columns={columns} data={data} customStyles={customStyles} pagination showGridlines
                            />) : (<p>"Please Enter a Query and State"</p>)}
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Namescape
