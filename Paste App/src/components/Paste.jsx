import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)

  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useDispatch();

  const filteredData = pastes.filter(paste =>
    typeof paste.title === "string" &&
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )


  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }
  function handleShare(paste) {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: window.location.href, // or a specific paste link if you have one
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing', error));
    } else {
      alert('Sharing not supported on this browser. Copy manually.');
    }
  }

  return (
    <div>
      <input
        className='p-3 rounded-2xl min-w-[600px] mt-5'
        type="search"
        placeholder='Search here..... '
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div  key={paste?._id}className='border'>
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>
                    <button>
                      <NavLink to={`/?pasteId=${paste?._id}`}>
                        Edit
                      </NavLink>
                    </button>
                    <button>
                       <NavLink to={`/pastes/${paste?._id}`}>
                        View
                      </NavLink>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content)
                        toast.success("Copied to Clipboard")
                      }
                      } >Copy</button>
                    <button onClick={() => handleShare(paste)}>Share</button>

                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>

              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste
