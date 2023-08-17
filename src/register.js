import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Register() {
    const navigate = useNavigate();
    const [inputData, setInputdata] = useState({});
    const [showPassword, setShowPassword] = useState("password");
    useEffect(() => {
        if (localStorage.getItem('usertoken')) {
            navigate('/shopping-app/')
        } else {
            navigate('/register')
        }
    }, [])

    const HandleEye = () => {
        setShowPassword(showPassword === "password" ? "text" : "password")
    }

    const handleData = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setInputdata({ ...inputData, [key]: value })
    }

    const toastSucess = () => toast.success("success", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
    });
    const toastwarning = () => toast.error("all field are required", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputData.email || !inputData.password || !inputData.fullname) {
            toastwarning();
        } else {
            console.log(inputData)
            const id = toast.loading("Please wait....", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000
            })

            axios.post(`https://reqres.in/api/register`, inputData)
                .then((res) => {
                    localStorage.setItem("userdata", JSON.stringify(inputData))
                    localStorage.setItem("usertoken", res?.data?.token)
                    toast.update(id, { render: "Registered Successfully", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000);
                })
                .catch((err) => {
                    toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                    if (axios.isAxiosError(err)) {
                        console.log(err?.response?.data?.error)
                        if (!err?.response) {
                            toast.update(id, { render: "No Server Response", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                        } else if (err.response?.status === 400) {
                            toast.update(id, { render: "Missing Username or Password", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                            console.log("Missing Username or Password");
                        } else if (err.response?.status === 401) {
                            toast.update(id, { render: "Unauthorized", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                        } else {
                            toast.update(id, { render: "Registered failed", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                        }
                    }
                })
        }
    }

    return (
        <>
            <ToastContainer />
            <div>
                <form className='m-auto center_form form_shadow' onSubmit={handleSubmit} >
                    <h1 className='text-center'>Register</h1>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name :</label>
                        <input type="text" className="form-control" id="fullname" name='fullname' onChange={handleData}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email :</label>
                        <input type="text" className="form-control" id="email" name='email' onChange={handleData}></input>
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password :</label>
                    <div className='position-relative'>
                        <input type={showPassword} className="form-control" id="password" name='password' onChange={handleData}></input>
                        <span className='position-absolute ' style={{ right: "10px", top: "6px", cursor: "pointer" }} onClick={HandleEye}>{showPassword === "password"?<AiFillEyeInvisible />: <AiFillEye/>}</span>
                    </div>
                    </div>
                    <div className="form-group mt-3 dropend">
                        <label htmlFor="author">Gender :</label>
                        <div class="form-check form-check-inline ms-3">
                            <input className="form-check-input" type="radio" name="gender" value="male" onChange={handleData}></input>
                            <label className="form-check-label">male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" value="female" onChange={handleData}></input>
                            <label className="form-check-label">female</label>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mt-3' >
                        <button className="btn btn-primary  button_style">Submit</button>
                        <Link to="/" type="submit" className="btn btn-warning button_style_2 ">Back</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
