import React, { useRef, useState } from 'react'
import ResultTable from './ResultTable';
function Namescape() {
    // var data;
    let isEmpty = false;
    let [data, setData] = useState('')
    const [searchquery, setSearchQuery] = useState('');
    const [keyboardLang, setKeyboardLang] = useState('hindi');
    const [queryState, setQueryState] = useState('');
    const ref = useRef(null);

    const namescape_api = process.env.REACT_APP_ALL_STATE_NAME_API;

    const onChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleReset = (e) => {
        setSearchQuery('');
    }

    const handleSelect = (e) => {
        setKeyboardLang(e.target.value)
        setQueryState(e.target.options[e.target.selectedIndex].dataset.state)
    }

    const handleKeyboard = (e) => {
        e.preventDefault();
        window.openKeyboard(keyboardLang);
        ref.current.focus();
    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(queryState)
        if (queryState === '')
            window.alert("plese select state")
        try {
            const response = await fetch(namescape_api, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                // body: JSON.stringify({ query: searchquery, state: selectedOption.value })
                body: JSON.stringify({ query: searchquery, state: queryState })

            })

            const json = await response.json();
            if (json.success) {
                isEmpty = true;
                setData(json.name.map((element) => {
                    // console.log(element.name)
                    return {
                        name: element.name,
                        // vernacular_name: element.vernacular_name,
                        name_in: element.name_in
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
            name: 'Vernacular_name',
            selector: row => row.name_in,
        }
    ]

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
                                            <input type='text' name="searchquery" id="searchquery" ref={ref} onChange={onChange} className='queryInput' />
                                        </div></li>
                                    <li className="nav-item mx-2 mt-1"> State : </li>
                                    <li className="nav-item mx-2">
                                        <select className="form-select form-select-md" aria-label="Default select example" onChange={handleSelect}
                                            style={{ borderColor: 'black', borderRadius: '4px' }}>
                                            <option data-state='hindi' value={'hindi'}>Hindi</option>
                                            <option data-state='maharashtra' value={'marathi'}>Maharashtra</option>
                                            <option data-state='karanataka' value={'kannada'}>Karanataka</option>
                                            <option data-state='telengana' value={'telugu'}>Telangana</option>
                                            <option data-state='tamilnadu' value={'tamil'}>Tamilnadu</option>
                                            <option data-state='punjab' value={'punjabi'}>Punjab</option>
                                            <option data-state='odisha' value={'oriya'}>Odisha</option>
                                            <option data-state='kerala' value={'malayalam'}>Kerala</option>
                                            <option data-state='manipur' value={'manipuri'}>Manipur</option>
                                            <option data-state='tripura' value={'bengali'}>Tripura</option>
                                            <option data-state='gujarath' value={'gujarati'}>Gujarath</option>
                                            <option data-state='assam' value={'assamese'}>Assam</option>
                                        </select>
                                    </li>
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
                                    {/* <li className="nav-item">
                                        <img type='button' src='https://gisttransserver.in/sebi/assets/img/keyboard.png' onClick={handleKeyboard} height={38} className='mx-2' alt='keyboard'/>
                                    </li> */}
                                    <li className='mx-2' style={{ marginTop: '-4px', color: '#154063' }}>
                                        <i className="far fa-keyboard fa-3x" type='button' onClick={handleKeyboard} alt='keyboard'></i>
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

export default Namescape
