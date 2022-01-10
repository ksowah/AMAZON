import React from 'react'
import './checkout.css'
import Subtotal from './components/Subtotal'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './components/CheckoutProduct'

function Checkout() {

    const [{ basket }, dispatch] = useStateValue()

    return (
        <div className='checkout'>
            <div className='checkout__left'>
               

                <div>
                    <h2 className='checkout__tite'>Shopping Cart</h2>

                    
               
                        {
                            
                            basket.map(item => (
                                <CheckoutProduct
                                    image = {item.img}
                                    title ={item.title}
                                    id = {item.id}
                                    price = {item.price}
                                    rating = {item.rating}

                                />
                            ))
                        }
                    
                </div>
            </div>

            <div className='checkout__right'>
                <Subtotal/>
            </div>
        </div>
    )
}

export default Checkout
