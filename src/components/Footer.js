import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer className="footer p-1" style={{background: "#154063", color: "white", bottom: '0', width: '100%', position: 'sticky', paddingBottom: '20px'}}>
                <div className="container text-center">
                    <span>&copy; 2023 CDAC-Search. All Rights Reserved.</span>
                </div>
            </footer>
        </div>
    )
}
