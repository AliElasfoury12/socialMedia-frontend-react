import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
//import  { resetPosts } from './postsStore'
import { useDispatch } from 'react-redux'

export let trySunc = createAsyncThunk(
	'counter/trySunc',
	async () => { 
		let dispatch = useDispatch()
   // dispatch(resetPosts())
	}
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
    count2: 1
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.count += 1
      state.count2 -=1
    },
    decrement: state => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
      state.count2 -= action.payload

    },

    Try: () => {
     // console.log(payload.name, payload.id);
    // dispatch( resetPosts())
    console.log(postsState);
    
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, Try } = counterSlice.actions

export default counterSlice.reducer
