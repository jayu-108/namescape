import React, { useRef, useState } from 'react'
import ResultTable from './ResultTable';
// import Dropdown from './Dropdown';
function Namescape() {
    // var data;
    let isEmpty = false;
    let [data, setData] = useState('')
    const [searchquery, setSearchQuery] = useState('');
    // const [selectedOption, setSelectedOption] = useState('');
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
        // console.log("lang :"+e.target.value)
        // console.log("state : "+e.target.options[e.target.selectedIndex].dataset.state)
        // console.log("from select : " + keyboardLang);
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

    const buttonStyle = {
        background: "#154063",
        color: "white"
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
                            <header className="d-flex justify-content-center py-3">
                                <ul className="nav nav-pills">
                                    <li className="nav-item mx-2 mt-1">Name :</li>
                                    <li className="nav-item">
                                        <div >
                                            <input type='text' name="searchquery" id="searchquery" ref={ref} onChange={onChange} style={{ height: "36px", borderColor: "black", borderRadius: "4px", borderStyle: "solid", borderWidth: "1px" }} />
                                        </div></li>
                                    <li className="nav-item mx-2 mt-1"> State : </li>
                                    <li className="nav-item mx-2">
                                        {/* <Dropdown selectedOption={selectedOption} onChange={setSelectedOption} /> */}
                                        <select className="form-select form-select-md" aria-label="Default select example" onChange={handleSelect}
                                        style={{borderColor: 'black', borderRadius: '4px'}}>
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
                                            {<button className="btn btn-md  mx-2 " onClick={handleClick} type='submit' style={{ background: "#154063", color: "white" }}>Search</button>}
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div>
                                            {<button className="btn btn-md  mx-2 " onClick={handleReset} type='reset' style={buttonStyle}>Clear</button>}
                                        </div>
                                    </li>
                                    {/* <li className="nav-item">
                                        <button className="btn mx-2 btn-md" value='name' onClick={handleKeyboard} style={buttonStyle}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-keyboard" viewBox="0 0 16 16">
                                            <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                                            <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25z" />
                                        </svg></button>
                                    </li> */}
                                    <li className="nav-item">
                                        <img type='button' src='https://gisttransserver.in/sebi/assets/img/keyboard.png' onClick={handleKeyboard} height={38} className='mx-2' alt='keyboard'/>
                                    </li>
                                </ul>
                            </header>
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
