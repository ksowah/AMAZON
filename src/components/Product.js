import React, { useEffect } from 'react'
import { useStateValue } from '../StateProvider'
import './product.css'     


function Product({title, price, img, rating, id}) {

    const [{basket}, dispatch] = useStateValue()

    const addToCart = () => {
        dispatch({
           
            type: 'ADD_TO_BASKET',
            items: {
                id: id,
                title: title,
                img: img,
                price: price,
                rating: rating,
            },
        })
    }

    
    return (
        <div className='product'>
            <div className='product__info'>
                <p>{title}</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className='product__rating'>
                    {
                       Array(rating).fill().map(rating => {
                           return  <p key={rating}>⭐️</p>
                        })
                    }
                   
                </div>
            </div>
                    
            <img src={img}
                alt='product'
            />

            <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Product
