import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
// import 'react-multi-carousel/lib/styles.css';
// import Carousel from 'react-multi-carousel';
import SimpleImageSlider from "react-simple-image-slider";

function ProductDetails() {
    // const location = useLocation();
    // const id = location.state.userid;
   const {id} = useParams();
   const navigate = useNavigate();
    console.log(id)
    const [productdetails, setProducts] = useState([]);
    const [images, setImages] = useState([]);

    // useEffect(() => {
    //     if (localStorage.getItem('usertoken')) {
    //         Navigate('/productDetails')
    //     } else {
    //         navigate('/')
    //     }
    // }, [])
    
    const fetchProductDetails = async () => {
        try {
            await axios.get(`https://products-api-cwck.onrender.com/products/${id}`).then((res) => {
                setProducts(res?.data)
                setImages(res?.data?.images.map(i => i))
            })
        } catch (error) {
            return error.message;
        }
    }
    useEffect(() => {
        fetchProductDetails();
    }, [])

    return (
        <>
            <div key={productdetails.id} className='col-12' style={{marginTop:90}}>
                <div className='card_shadow'>
                    <div className='row'>
                        <div className='col-12 col-xl-3'>
                            <div className='image__parent'>
                                <SimpleImageSlider
                                    width={312}
                                    height={350}
                                    Maxwidth={312}
                                    Maxheight={350}
                                    images={images}
                                    showBullets={true}
                                    showNavs={true}
                                />
                            </div>
                        </div>
                        <div className='col-12 col-xl-9'>
                            <div>{productdetails.brand}</div>
                            <div>{productdetails.title}</div>
                            <div>{productdetails.description}</div>
                            <div>{productdetails.price}</div>
                            <div>{productdetails.discountPercentage}</div>
                            <div>{productdetails.rating}</div>
                            <div>{productdetails.stock}</div>
                        </div>
                    </div>
                </div >
            </div >
            </>
    )
}

export default ProductDetails
