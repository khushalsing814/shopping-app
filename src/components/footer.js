import React from 'react'

function Footer() {
    return (
        <>
            <div style={{backgroundColor:"black", color:"white", padding:"28px",position:"absolute",right:0,left:0,bottom:0}}>
                <div className='container d-flex justify-content-between flex-wrap'>
                    <div className=''>
                        <div>logo</div>
                        <div>copyright</div>
                    </div>
                    <div className=''>
                        <h3>usefulllinks</h3>
                        <ul className="p-0" style={{listStyle:"none"}}>
                            <li>About</li>
                            <li>services</li>
                            <li>contact</li>
                            <li>shop</li>
                        </ul>
                    </div>
                    <div className=''>
                        <h3>Contact</h3>
                        <ul className="p-0" style={{listStyle:"none"}}>
                            <li>instagram</li>
                            <li>facebook</li>
                            <li>linkedin</li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer