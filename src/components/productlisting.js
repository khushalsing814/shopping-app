import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { addtocart, apifetch } from './reduxToolkit/apislice';
import { useNavigate, Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReactReadMoreReadLess from "react-read-more-read-less";

function Productlisting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = useState('');
    const { products, loading } = useSelector(state => state.productApi)
    console.log(products.data)

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const handlefilter = (e) => {
        setFilter(e.target.name)
        console.log(filter)
    }

    useEffect(() => {
        dispatch(apifetch())
    }, [])

    let buttons = document.querySelectorAll('.btnstyle');
    console.log(buttons)
    buttons.forEach(element => {
        element.addEventListener('click', () => {
            document.querySelector('.active')?.classList.remove('active');
            element.classList.add('active');
            // buttons.forEach(btn => btn.classList.add('active'));
        });
    });
    const toastwarning = () => toast.error("please!! kindly login your account", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
    });

    // const Handledata = (id) => {
    //     if (!localStorage.getItem(`usertoken`)) {
    //         toastwarning();
    //         navigate('/shopping-app/')
    //     } else {
    //         navigate('/ProductDetails', { state: { userid: id } })
    //     }
    // }

    const HandleLink =(id)=>{
        if(!localStorage.getItem('usertoken')){
            toastwarning();
        }
    }

    return (
        <>
            <ToastContainer />
            {loading ?  <h1 className="loading_mobile" style={{ textAlign: "center", marginTop: 20, marginBottom: 20, minHeight: 350 }} >loading...</h1>
            :
            <div className='mt-3 mb-3 text-center w-100'>
                <h1 className='text-center d-block'>Latest Products</h1>
                <ul className="d-flex justify-content-center p-0">
                    <li className="nav-item me-2 btnstyle active position-relative">
                        <a className="nav-link" aria-current="page" name="all" onClick={handlefilter}>All</a>
                    </li>
                    <li className="nav-item  me-2 btnstyle">
                        <a className="nav-link" aria-current="page" name="laptops" onClick={handlefilter}>laptops</a>
                    </li>
                    <li className="nav-item me-2 btnstyle">
                        <a className="nav-link" aria-current="page" name="fragrances" onClick={handlefilter}>fragrances</a>
                    </li>
                    <li className="nav-item btnstyle me-2">
                        <a className="nav-link" aria-current="page" name="smartphones" onClick={handlefilter}>smartphones</a>
                    </li>
                </ul>
            </div>
            } 
            <div className='container parent-react-multi-carousel-list '>
                <div className='row'>
                    {
                        products?.data?.length > 0 &&
                        <Carousel responsive={responsive}>
                            {
                                products?.data && products?.data.filter((items) => {
                                    if (filter.toLocaleLowerCase() == 'all') {
                                        return items;
                                    } else if (items.category) {
                                        return items.category.toLocaleLowerCase().match(filter.toLocaleLowerCase());
                                    } else {
                                        return items
                                    }
                                })
                                    .map((items) => {
                                        return (
                                            <div key={items.id} className='card_width'>
                                                <div className='card_shadow'>
                                                    <Link to={localStorage.getItem(`usertoken`) && `/productDetails/${items.id}`} className="setcolor" style={{ border: 0 }} onClick={()=>HandleLink(items.id)}>
                                                        <div className='card-image--parent'><img src={items.thumbnail}></img></div>
                                                        <div className="card-header mt-2 mb-2">
                                                            <span className="badge text-bg-info fs-5" style={{ whiteSpace: "wrap" }}> {items.title}</span></div>

                                                        <ReactReadMoreReadLess charLimit={30} readMoreText={"Read more ▼"} readLessText={"Read less ▲"} >
                                                            {items.description}
                                                        </ReactReadMoreReadLess>


                                                        {/* <div className="card-desc">{items.description}</div> */}
                                                    </Link>
                                                    <span className='position-relative'>
                                                        <button onClick={() => localStorage.getItem(`usertoken`) && dispatch(addtocart(items))} className="btn btn-outline-primary w-100 mt-2">Add to Cart</button>
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </Carousel>
                    }
                </div>
            </div>
            
        </>
    )
}

export default Productlisting
