
import {  useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ViewPaste = () => {


  const {id} = useParams();
  const allPastes = useSelector((state)=>state.paste.pastes);
  const paste = allPastes.filter((p)=>p._id ===id)[0]
  console.log(paste)
  return (
    <div>
      <div className='flex flex-row gap-5 place-content-between'>
                <input
                    className='p-2 rounded-xl mt-3 w-[66%] pl-5'
                    type="text"
                    placeholder='Enter Title here'
                    value={paste.title}
                    disabled
                    // onChange={(e) => setTitle(e.target.value)}
                />

              
            </div>
            <div>
                <textarea
                    className='rounded-2xl mt-4 min-w-[500px] p-4'
                    value={paste.content}
                    placeholder='Write your content here...'
                    disabled
                    
                />
            </div>
    </div>
  )
}

export default ViewPaste
