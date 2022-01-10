import React, { useEffect, useState } from 'react'
import './payment.css'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { selectUserName } from './features/user/UserSlice'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './components/CheckoutProduct'
import { getBasketTotal } from './reducer.js'
import CurrencyFormat from 'react-currency-format'
import {
    CardElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
import axios from './axios'
import app from './firebase'
import { getFirestore, doc, setDoc } from "firebase/firestore";


function Payment() {

    const userName = useSelector(selectUserName)
    const [{basket, user}, dispatch] = useStateValue()
    const history = useHistory()

    const elements = useElements()
    const stripe = useStripe()

    console.log(user)

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(null)
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('')
    const [clientSecret, setClientSecret] = useState(true)

  
    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret()
    }, [basket])

    console.log('CLIENT SECRETE >>>>>', clientSecret)

    const handleSubmit = async e =>  {
        e.preventDefault()
        setProcessing(true)

       const payload = await stripe.confirmCardPayment(clientSecret, {
           payment_method: {
               card: elements.getElement(CardElement)
           }
       }).then(({paymentIntent}) => {


           setSucceeded(true)
           setError(null)
           setProcessing(false)

           dispatch({
               type: 'EMPTY BASKET'
           })

           history.replace('/orders')
       })
    }

    const handleChange = e => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message: '')
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout {<Link to='/checkout'>{basket.length} item(s)</Link>}
                </h1>
                <div className='payment__section'>
                      <div className='payment__title'>
                            <h3>Delivery Address</h3>  
                      </div>
                      <div className='payment__address'>
                        <p> {userName} </p>
                        <p>123 React Lane</p>
                        <p>Accra, Ghana</p>
                      </div>  
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className='payment__items'>
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

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* STRIPE MAGIC */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                       
                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total : {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeperator={true}
                                    prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Payment
