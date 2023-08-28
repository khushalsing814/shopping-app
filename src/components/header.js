import React from 'react'

function Header() {
    return (
        <>
            <header className='background_image_header'>
                <div className='parent_image'>
                    {/* <img src='https://reactjs-ecommerce-app.vercel.app/assets/main.png.jpg'></img> */}
                    <video loop muted autoPlay="autoplay" style={{height:"100%" ,width:"100%"}}>
                        <source src="./video/womanvideo.mp4" type="video/mp4"/>
                       </video>
                        </div>
                        {/* <p className='container header_text' style={{color:"black"}}><h1>New Season Arrivals</h1>
                            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                    </header>

                </>
                )
}

                export default Header
