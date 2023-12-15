import React from 'react'

export default function Header() {
    return (
        <div>
            <div>
                <header className="d-flex justify-content-center py-3" style={{ backgroundColor: "#154063"}}>
                    <ul className="nav nav-pills">
                        <li className="nav-item"><img src='https://gisttransserver.in/assets/img/logo.svg' alt='cdac-logo' style={{ height: "100px", width: "100px" }}></img></li>
                        <li className="nav-item"><h1 className='mx-2 mt-3' style={{ color: "white" }}>CDAC Name & Address Search</h1></li>
                    </ul>
                </header>
            </div>
        </div>
    )
}
