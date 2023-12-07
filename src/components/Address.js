import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Select from 'react-select';

function Namescape() {
    // var data;
    let isEmpty = false;
    let [data, setData] = useState('')
    const [searchquery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const options = [
        { value: 'maharashtra', label: 'Maharashtra' },
        { value: 'assam', label: 'Assam' },
        { value: 'gujrat', label: 'Gujarath' },
        { value: 'tripura', label: 'Tripura' },
        { value: 'karnataka', label: 'Karnataka' },
        { value: 'manipur', label: 'Manipur' },
        { value: 'kerala', label: 'Kerala' },
        { value: 'odisha', label: 'Odisha' },
        { value: 'punjab', label: 'Punjab' },
        { value: 'telangana', label: 'Telangana' },
        { value: 'tamilnadu', label: 'Tamilnadu' }
    ]

    const customStyles = {
        table: {
            style: {
                border: '1px blue',
            },
        },
        headRow: {
            style: {
                backgroundColor: 'lightgray',
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
                <div className="container-md" >
                    <div class="container">
                        <header class="d-flex justify-content-center py-3" style={{ backgroundColor: "lightblue" }}>
                            <ul class="nav nav-pills">
                                <li class="nav-item"><img src='https://gisttransserver.in/assets/img/logo.svg' alt='cdac-logo' style={{ height: "100px", width: "100px" }}></img></li>
                                <li class="nav-item"><h1 className='mx-2 mt-3'>CDAC-NameScape Search</h1></li>
                            </ul>
                        </header>
                    </div>
                    <form>
                        <div class="container">
                            <header class="d-flex justify-content-center py-3">
                                <ul class="nav nav-pills">
                                    <li class="nav-item mx-2 mt-1">Query :</li>
                                    <li class="nav-item">
                                        <div >
                                            <input name="searchquery" id="searchquery" onChange={onChange} style={{ height: "36px", borderColor: "black", borderRadius: "4px", borderStyle: "solid", borderWidth: "1px" }} />
                                        </div></li>
                                    <li class="nav-item">
                                        <div>
                                            {/* <div ></div> */}
                                            {<button className="btn btn-sm btn-primary mx-2 " onClick={handleClick} type='submit' style={{ height: "36px" }}>Search</button>}
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
