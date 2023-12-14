import React, { useState } from 'react'
import Namescape from './Namescape'
import NameKn from './NameKn'
import Address from './Address'
import Header from './Header';
import Footer from './Footer';
import './css/button.css';

// import $ from 'jquery';
// import '../keyboard/js/CDAC-Typing.js'

export default function Cdac() {

    const [searchType, setSearchType] = useState('');
    const [active, setActive] = useState('');

    const handleClick = (event,btn) => {
        setSearchType(event.target.value)
        setActive(btn);
    }

    const btEnabledStyle = 'btn m-2 btEnabledStyle'
    const btDisabledStyle = 'btn m-2 btDisabledStyle'

    return (
        <div>
            <div className="container-md">
                <div className='container'>
                    <Header />
                </div>
                <div className='d-flex justify-content-center py-3'>
                    <ul className='nav nav-pills'>
                        <li className='nav-item'>
                            <button className={active === 'namescape'? btEnabledStyle : btDisabledStyle} onClick={(event)=>handleClick(event,'namescape')} id='namescape' value='namescape'>Namescape</button>
                            <button className={active === 'address'? btEnabledStyle : btDisabledStyle} onClick={(event)=>handleClick(event,'address')} id='address' value='address'>Address</button>
                            <button className={active === 'name'? btEnabledStyle : btDisabledStyle} onClick={(event)=>handleClick(event,'name')} id='name' value='name'>Name</button>
                        </li>
                    </ul>
                </div>
                <div>
                    {searchType === 'name' ? <NameKn /> : searchType === 'address' ? <Address /> : <Namescape />}
                </div>
                <div className='container'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
