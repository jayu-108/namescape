import React, { useState } from 'react'
import Select from 'react-select';
import ResultTable from './ResultTable';
import Dropdown from './Dropdown';

function Namescape() {
    // var data;
    let isEmpty = false;
    let [data, setData] = useState('')
    const [searchquery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const onChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://10.208.10.70:5000/name/search', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ query: searchquery, state: selectedOption.value })
            })

            const json = await response.json();
            if (json.success) {
                isEmpty = true;
                setData(json.name.map((element) => {
                    // console.log(element.name)
                    return {
                        name: element.name,
                        vernacular_name: element.vernacular_name
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
            name: 'Name',
            selector: row => row.name,
        }
        ,
        {
            name: 'vernacular_name',
            selector: row => row.vernacular_name,
        }
    ]

    return (
        <>
            <div>
                <div className="container-md" >
                    <div className="container">
                        <header className="d-flex justify-content-center py-3" style={{ backgroundColor: "#154063" }}>
                            <ul className="nav nav-pills">
                                <li className="nav-item"><img src='https://gisttransserver.in/assets/img/logo.svg' alt='cdac-logo' style={{ height: "100px", width: "100px" }}></img></li>
                                <li className="nav-item"><h1 className='mx-2 mt-3' style={{ color: "white" }}>CDAC Name & Address Search</h1></li>
                            </ul>
                        </header>
                    </div>
                    <form className='mx-2' >
                        <div className="row" >
                            <div className="col-2"></div>
                            <div className="col-3" >
                                <label className='m-1'>Query :</label>
                                <input name="searchquery" id="searchquery" onChange={onChange} style={{ height: "36px", borderColor: "black", borderRadius: "4px", borderStyle: "solid", borderWidth: "1px" }} />
                            </div>
                            <div className="col-3">
                                <label className='m-1'>State :</label>
                                <Dropdown selectedOption={selectedOption} onChange={setSelectedOption} />
                            </div>
                            <div className="col">
                                <div className='mt-2'></div>
                                {<button className="btn btn-sm btn-primary mx-1 mt-4" onClick={handleClick} type='submit' style={{ height: "36px" }}>Search</button>}
                            </div>
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

export default Namescape
