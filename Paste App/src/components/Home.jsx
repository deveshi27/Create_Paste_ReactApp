import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const Home = () => {
    const [title, setTitle] = useState(0)
    const [value, setValue] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()
    const pasteId = searchParams.get("pasteId")
    const dispatch = useDispatch()
    const allPastes = useSelector((state) => state.paste.pastes)
     useEffect(() => {
            if (pasteId) {
                     const paste = allPastes.find((p)=>
                    p._id === pasteId);
                     setTitle(paste.title);
                     setValue(paste.content)
            }
        }, [pasteId])  
    function createPaste() {
        const paste =

        {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString()
        }
        if (pasteId) {
            dispatch(updateToPastes(paste))
        }
        else {
            dispatch(addToPastes(paste))
        }

        //After Creation or Updation
        setTitle("")
        setValue("")
        setSearchParams({})

    }
    return (
        <div>
            <div className='flex flex-row gap-5 place-content-between'>
                <input
                    className='p-2 rounded-xl mt-3 w-[66%] pl-5'
                    type="text"
                    placeholder='Enter Title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button onClick={createPaste} className='p-2 rounded-xl mt-3'>{
                    pasteId ? "Update Paste" : "Create Paste"}</button>
            </div>
            <div>
                <textarea
                    className='rounded-2xl mt-4 min-w-[500px] p-4'
                    value={value}
                    placeholder='Write your content here...'
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Home
