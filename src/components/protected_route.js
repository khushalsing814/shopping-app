import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected_route(props) {
   const navigate =  useNavigate();
    const { Cmp } = props;
    useEffect(() => {
        if (!localStorage.getItem('usertoken')) {
            navigate('/shopping-app')
        }
    })

    return (
      <>
      <Cmp/>
      </>
    )
}

export default Protected_route