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
        { value: 'karnatak', label: 'Karnataka' },
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

        const response = await fetch('http://10.208.10.158:5000/search', {
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
                    name_in: element.name_in
                }
            }))
        }
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        }
        // ,
        // {
        //     name: 'Name_in',
        //     selector: row => row.name_in,
        // },
    ]

    return (
        <>
            <div className="container-sm" >
                <div className="row" >
                    <h1 className='my-2' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>CDAC-NameScape Search</h1>
                </div>
                <form className='mx-2' >
                    <div className="row">
                        <div className="col-3">
                            <label className='m-1'>Query :</label>
                            <input name="searchquery" id="searchquery" onChange={onChange} style={{height: "36px",borderColor: "black", borderRadius: "4px", borderStyle: "solid", borderWidth: "1px"}}/>
                        </div>
                        <div className="col-3">
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
                        </div>
                        <div className="col">
                            <div className='mt-2'></div>
                            {<button className="btn btn-sm btn-primary mx-1 mt-4" onClick={handleClick} type='submit' style={{height: "36px"}}>Search</button>}
                        </div>
                    </div>
                </form>
                {!isEmpty ? (<DataTable columns={columns} data={data} pagination
                />) : (<p>"Please Enter a Query and State"</p>)}
            </div>
        </>
    )
}

export default Namescape
