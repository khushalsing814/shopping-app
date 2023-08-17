import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, } from "react-router-dom";

function Navigationbar() {
    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.productApi);

    console.log(cart)

    const users = JSON.parse(localStorage.getItem('userdata'))
    console.log(users)

    const HandleDelledaccount = () => {
        const confirm = window.confirm("are you sure to delete your account")
        if (confirm) {
            localStorage.removeItem('userdata')
            localStorage.removeItem('usertoken')
        }
    }

    const Handlelogin = (e) => {
        e.preventDefault();
        navigate('/login')
    }
    const HandleRegister = (e) => {
        e.preventDefault();
        navigate('/register')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg z-1">
                <div className="container bg-dark navbar-dark bg-dark rounded py-1">
                    <Link to="/" className="navbar-brand">Logo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                        </ul>
                        {
                            !localStorage.getItem('usertoken') ?
                                <form className="d-flex">
                                    <button onClick={Handlelogin} className="btn btn-outline-light me-2" type="submit">login</button>
                                    <button onClick={HandleRegister} className="btn btn-outline-light me-2" type="submit">register</button>
                                </form>
                                :
                                <div className='d-flex'>
                                    <span className='position-relative'>
                                        <Link to="/addcart" className="btn btn-outline-light me-2" type="submit">cart
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {cart.length}
                                                <span className="visually-hidden">unread messages</span>
                                            </span>
                                        </Link>
                                    </span>
                                    <div className="dropdown ms-3">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {users && users.fullname}
                                        </button>
                                        <ul className="dropdown-menu">
                                            
                                            <li><Link to="/" className="dropdown-item" onClick={HandleDelledaccount}>Delete Account</Link></li>
                                            <li><Link to="/" className="dropdown-item" onClick={() => localStorage.removeItem('usertoken')}>Logout</Link></li>
                                        </ul>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navigationbar