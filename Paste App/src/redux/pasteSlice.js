import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const newpaste = action.payload
      const pasteExists = state.pastes.some(paste => paste.title === newpaste.title)
      if (!pasteExists) {
        state.pastes.push(newpaste)
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Created Successfully")
      }
      else {
        toast.error("Paste already exists")
      }
    },
    updateToPastes: (state, action) => {
        const paste =action.payload;
        const index = state.pastes.findIndex((item)=>item._id === paste._id);
        if(index>=0)
        {
          state.pastes[index] = paste;
          localStorage.setItem("pastes",JSON.stringify(state.pastes))
          toast.success("Paste Updated !!")
        }

    },
    resetAllPastes: (state) => {
         state.pastes=[]
         localStorage.removeItem("pastes")
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId,"Deleted")
         const index = state.pastes.findIndex((item)=>
        item._id===pasteId)
         if (index>=0)
         {
          state.pastes.splice(index,1);
          localStorage.setItem("pastes",JSON.stringify(state.pastes));

          toast.success("Paste deleted")
         }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer