import React, { useState } from 'react'
import Namescape from './Namescape'
import NameKn from './NameKn'
import Address from './Address'
import Header from './Header';
// import Footer from './Footer';

// import $ from 'jquery';
// import '../keyboard/js/CDAC-Typing.js'

export default function Cdac() {

    const [searchType, setSearchType] = useState('');

    const handleClick = (e) => {
        setSearchType(e.target.value)
        console.log(searchType)
    }

    const buttonStyle = {
        background: "#154063", 
        color: "white"
    }

    return (
        <div>
            <div className="container-md">
                <div className="container">
                    <Header />
                </div>
                <div className='d-flex justify-content-center py-3'>
                    <ul className='nav nav-pills'>
                        <li className='nav-item'>
                            <button className="btn m-2" onClick={handleClick} value='namescape' style={buttonStyle}>Namescape</button>
                            <button className="btn m-2" onClick={handleClick} value='address' style={buttonStyle}>Address</button>
                            <button className="btn m-2" onClick={handleClick} value='name' style={buttonStyle}>Name</button>
                        </li>
                    </ul>
                </div>
                <div>
                    {searchType === 'name' ? <NameKn /> : searchType === 'address' ? <Address /> : <Namescape />}
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}
