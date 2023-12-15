import React, { useRef, useState } from 'react'
import ResultTable from './ResultTable';

function NameKn() {
    // var data;
    let isEmpty = false;
    let [data, setData] = useState('')
    const [searchquery, setSearchQuery] = useState('');
    const ref = useRef(null);
    const name_kn_api = process.env.REACT_APP_NAME_KN_API;
    const handleQuery = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(name_kn_api, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ query: searchquery })
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

    const handleReset = (e) => {
        setSearchQuery('');
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        }
        ,
        {
            name: 'Vernacular Name',
            selector: row => row.vernacular_name,
        }
    ]

    const handleKeyboard = (e) =>{
        e.preventDefault();
        window.openKeyboard('kannada');
        ref.current.focus();
    }

    return (
        <>
            <div>
                <div className="container-md" >
                    {/* <div className="container">
                        <Header />
                    </div> */}
                    <form>
                        <div className="container">
                            <div className="d-flex justify-content-center py-3">
                                <ul className="nav nav-pills">
                                    <li className="nav-item mx-2 mt-1">Name :</li>
                                    <li className="nav-item">
                                        <div >
                                            <input type='text' className='mx-2 queryInput' name="searchquery" id="searchquery" ref={ref} onChange={handleQuery} />
                                        </div></li>
                                    <li className="nav-item">
                                        <div>
                                            {<button className="btn btn-md mx-2 buttonStyle" onClick={handleClick} type='submit'>Search</button>}
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div>
                                            {<button className="btn btn-md mx-2 buttonStyle" onClick={handleReset} type='reset'>Clear</button>}
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <img type='button' src='https://gisttransserver.in/sebi/assets/img/keyboard.png' onClick={handleKeyboard} height={38} className='mx-2' alt='keyboard'/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                    <div className="row" >
                        <div className="col"></div>
                        <div className="col-8 mt-1" >
                            {!isEmpty ? (<ResultTable data={data} columns={columns} />) : (<p>"Please Enter a Query and State"</p>)}
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NameKn
