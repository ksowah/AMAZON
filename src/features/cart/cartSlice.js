import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    collection: {
        title: '',
        price: 0.00,
        img: '',
        rating: 0,
        id: '',
    },
}

const cartSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        cartItems: (state, action) => {
            state.title = action.payload.title
            state.price = action.payload.price
            state.img = action.payload.img
            state.rating = action.payload.rating
            state.id = action.payload.id
            state.cart = ['hello']
            
        }
    }
})


export default cartSlice.reducer

export const { cartItems, loadCart } = cartSlice.actions

export const selectTitle = (state) => state.title
export const selectPrice = (state) => state.price
export const selectId = (state) => state.id
export const selectRating = (state) => state.rating
export const selectImg = (state) => state.img
export const selectCart = (state) => state.cart
export const selectCollecion = (state) => state.collection

