import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Select from 'react-select';

function Namescape() {
    var data;
    const [searchquery, setSearchQuery] = useState('');
    const [result, setResult] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const options = [
        { value: 'maharashtra', label: 'Maharashtra' },
        { value: 'assam', label: 'Assam' },
        { value: 'gujrat', label: 'Gujarath' },
        { value: 'tripura', label: 'Tripura' },
        { value: 'karnatak', label: 'Karnataka' },
        { value: 'manipur', label: 'Manipur' },
        { value: 'kerala', label: 'Kerala' },
        { value: 'orissa', label: 'Orissa' },
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
            setResult(json.name)
            // console.log(searchquery)
            console.log(selectedOption.value)
            console.log(json.total)
            console.log(result)
        } else {
            setResult('');
        }
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Name_in',
            selector: row => row.name_in,
        },
    ]
    var isEmpty = false;
    if (searchquery !== '' && result !== '') {
        isEmpty = true;
        data = result.map((element) => {
            console.log(element.name)
            return {
                name: element.name,
                name_in: element.name_in
            }
        })
    }

return (
        <>
            <div className="container " >
                <div className="row">
                    <h1 className='my-2'>NameScape Search</h1>
                </div>
                <form>
                    <div className="row">
                        <div className="col">
                            <label>
                                Query <input name="searchquery" id="searchquery" onChange={onChange} />
                            </label>
                        </div>
                        <div className="col">
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        </div>
                        <div className="col">
                            <button className="btn btn-sm btn-primary mx-2" onClick={handleClick} type='submit'>Search</button>
                        </div>
                    </div>
                </form>
                {isEmpty ? (<DataTable columns={columns} data={data} pagination
                />) : (<p>"Please Enter a query"</p>)}
            </div>
        </>
    )
}

export default Namescape
