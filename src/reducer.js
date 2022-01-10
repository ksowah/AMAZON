export const initialState = {
    basket: [],
    user: null
}
       
// // Selector
   export const getBasketTotal = (basket) => 
  basket?.reduce((amount, items) => items.price + amount, 0);

const reducer = (state, action) => {
    console.log(action)
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                initialState,
                basket: [...state.basket, action.items]
            }

            case 'EMPTY BASKET':
                return {
                    ...state,
                    basket: []
                }


        case 'REMOVE_FROM_BASKET': 
            const index = state.basket.findIndex(
                (basketItems) => basketItems.id === action.id
            )

            let newBasket = [...state.basket]

            if(index >= 0) {
                newBasket.splice(index, 1)
            }else{
                console.warn(`cant remove product ( id : ${action.id} as it's not in cart)`)
            }

            return {
                ...state,
                basket: newBasket
            }

            case "SET_USER":
                return {
                    ...state,
                    user: action.user
                }

            default: 
                return state;
    }
}

export default reducer


