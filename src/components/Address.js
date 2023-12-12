import React, { useState } from 'react'
import ResultTable from './ResultTable';
import Header from './Header';

function Address() {
    // var data;
    let isEmpty = false;
    let [data, setData] = useState('')
    const [searchquery, setSearchQuery] = useState('');

    const onChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://10.208.10.70:5000/address/searchaddress', {
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

    const handleReset = (e) => {
        setSearchQuery('');
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
                    {/* <div className="container">
                        <Header />
                    </div> */}
                    <form>
                        <div className="container">
                            <header className="d-flex justify-content-center py-3">
                                <ul className="nav nav-pills">
                                    <li className="nav-item mx-2 mt-1">Address :</li>
                                    <li className="nav-item">
                                        <div >
                                            <input name="searchquery" id="searchquery" onChange={onChange} style={{ height: "36px", borderColor: "black", borderRadius: "4px", borderStyle: "solid", borderWidth: "1px" }} />
                                        </div></li>
                                    <li className="nav-item">
                                        <div>
                                            {<button className="btn btn-md mx-2 " onClick={handleClick} type='submit' style={{ background: "#154063", color: "white" }}>Search</button>}
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div>
                                            {<button className="btn btn-md mx-2 " onClick={handleReset} type='reset' style={{ background: "#154063", color: "white" }}>Clear</button>}
                                        </div>
                                    </li>
                                </ul>
                            </header>
                        </div>
                    </form>
                    <div className="row" >
                        <div className="col"></div>
                        <div className="col-10 mt-1" >
                            {!isEmpty ? (<ResultTable data={data} columns={columns} />) : (<p>"Please Enter a Query and State"</p>)}
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Address
