import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    name: '',
    account: null,
    logedIn: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.name = action.payload.name
            state.logedIn = action.payload.logedIn
            state.account = action.payload.account
            
        },
        setSignOut: (state) =>{
            state.name = ''
            state.logedIn = false
            state.account = null
        }
    }
})


export const { setUserLogin, setSignOut } = userSlice.actions

export const selectUserName = (state) => state.user.name
export const selectLogedIn = (state) => state.user.logedIn
export const selectAccount = (state) => state.user.account

export default userSlice.reducer





