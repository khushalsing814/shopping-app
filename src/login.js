import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';

function Login() {
    const navigate = useNavigate();
    const [inputData, setInputdata] = useState({});
    useEffect(() => {
        if (localStorage.getItem('usertoken')) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [])


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
    const toastinfo = () => toast.info("your account is not registered please!! registered firstly", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
    });
    const wrongApi = () => toast.error("wrong api url", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputData.email || !inputData.password) {
            toastwarning();
        } else if (!localStorage.getItem('userdata')) {
            toastinfo();
        }
        else {
            const id = toast.loading("Please wait....", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000 
            })
            axios.post(`https://reqres.in/api/login`, inputData)
                .then((res) => {
                    if (res?.data?.token !== undefined && res?.data?.token !== null) {
                        localStorage.setItem("usertoken", res?.data?.token)
                        toast.update(id, { render: "Login Successfully", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                        setTimeout(() => {
                            navigate('/')
                        }, 2000);
                    } else {
                        wrongApi();
                    }
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
                            toast.update(id, { render: "Login failed", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                        }
                    }
                })

        }
    }

    return (
        <>
            <ToastContainer />
            <form className='m-auto center_form form_shadow' onSubmit={handleSubmit} >
                <h1 className='text-center'>Login</h1>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" name='email' onChange={handleData}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" className="form-control" id="password" name='password' onChange={handleData}></input>
                </div>
                <div className='d-flex justify-content-between mt-3' >
                    <button className="btn btn-primary button_style">Submit</button>
                    <Link to="/" type="submit" className="btn btn-warning button_style_2">Back</Link>
                </div>
            </form>
        </>
    )
}

export default Login
