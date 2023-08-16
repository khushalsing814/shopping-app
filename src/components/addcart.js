import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, quantityItems, removeItems } from './reduxToolkit/apislice';
import { useNavigate } from 'react-router-dom';

function Addcart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart ,totalquantity,totalprice} = useSelector((state) => state.productApi);
    console.log(cart)
    console.log(totalquantity)
    console.log(totalprice)

    dispatch(quantityItems())

    const Handleincrement = (items) => {
        if(items.id > 0){
            dispatch(increment(items.id))
        }
    }
    const Handledecrement = (items) => {
        if(items.id > 0){
            dispatch(decrement(items.id))
        }
    }

    const HandleDelled = (id) => {
        const confirm = window.confirm("Are you sure to want a record");
        if (confirm) {
            dispatch(removeItems(id))
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-9 add--scrollbar'>
                        <h1 style={{ display: "block", textAlign: "center" }}>cart items</h1>
                        {
                            cart.map((items) => {
                                console.log(items)
                                return (

                                    <div className='row form_shadow position-relative' key={items.id}>
                                        <div className='col-12 col-md-9'>
                                            <div className='row gx-5'>
                                                <div className='col-12 col-md-3'>
                                                    <div className='image__parent'>
                                                        <img src={items.images[0]}></img>
                                                    </div>
                                                </div>
                                                <div className='col-12 col-md-9'>
                                                    <div>{items.brand}</div>
                                                    <div>{items.title}</div>
                                                    <div>{items.description}</div>
                                                    <div>{items.price}</div>
                                                    <div>{items.discountPercentage}</div>
                                                    <div>{items.rating}</div>
                                                    <div>{items.stock}</div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-12 col-md-3'>
                                            <div className='form_shadow'>
                                                {/* <h1 style={{ display: "block", textAlign: "center" }}>Counter</h1> */}
                                                <div className='d-flex justify-content-around'>
                                                    <button className={items.quantity >= 0 && 'btn btn-success'} onClick={()=>Handleincrement(items)}>+</button>
                                                    <div className='text-center'>
                                                        <div>Quantity</div> 
                                                        <span>{items.quantity} </span>
                                                    </div>
                                                    <button className={items.quantity < 1 ? 'btn btn-danger disabled' :'btn btn-warning'} onClick={()=>Handledecrement(items)}>-</button>
                                                </div>
                                            </div>
                                        </div>
                                        <button className='btn btn-danger' onClick={() => HandleDelled(items.id)}>remove</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='col-12 col-md-3 form_shadow dashboard'>
                        <h1>Summary</h1>
                        <div className='d-flex justify-content-between'>
                            <p>Total Quantity</p>
                            <p>{totalquantity}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p>Total Amount</p>
                            <p>{`₹ ${totalprice}`}</p>
                        </div>
                        <button className='btn btn-primary w-100' onClick={() => navigate('/shopping-app/')}>Go to Dashboard</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addcart