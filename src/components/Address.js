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
            name: 'address',
            selector: row => row.address,
        }
        ,
        {
            name: 'vernacular_address',
            selector: row => row.vernacular_address,
        }
    ]

    return (
        <>
            <div>
                <div className="container-sm" >
                    <div className="row mt-2" >
                        <div className="col-2"></div>
                        <div className="col-1">
                            <img src='https://gisttransserver.in/assets/img/logo.svg' alt='cdac-logo' style={{ height: "100px", width: "100px" }}></img>
                        </div>
                        <div className="col-6 mt-3">
                            <h1 className='m-2'>CDAC-NameScape Search</h1>
                        </div>
                    </div>
                    <form className='mx-2' >
                        <div className="row" >
                            <div className="col-2"></div>
                            <div className="col-3" >
                                <label className='m-1'>Query :</label>
                                <input name="searchquery" id="searchquery" onChange={onChange} style={{ height: "36px", borderColor: "black", borderRadius: "4px", borderStyle: "solid", borderWidth: "1px" }} />
                            </div>
                            {/* <div className="col-3">
                                <label className='m-1'>State :</label>
                                <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: 'black',
                                        }),
                                    }}
                                />
                            </div> */}
                            <div className="col">
                                <div className='mt-2'></div>
                                {<button className="btn btn-sm btn-primary mx-1 mt-4" onClick={handleClick} type='submit' style={{ height: "36px" }}>Search</button>}
                            </div>
                        </div>
                    </form>
                    <div className="row" >
                        <div className="col-2"></div>
                        <div className="col-6">
                            {!isEmpty ? (<DataTable columns={columns} data={data} pagination showGridlines
                            />) : (<p>"Please Enter a Query and State"</p>)}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Namescape
