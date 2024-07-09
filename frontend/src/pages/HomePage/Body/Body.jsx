import React from 'react'
import Collection from './Collection'

const Body = () => {
  return (
    <div className='p-10 bg-blue-950 rounded-t-xl bg-opacity-70 flex flex-col items-start gap-9 w-full '>
        <h1 className='text-slate-300 text-lg sm:text-2xl font-extrabold'>Collections</h1>
        <Collection/>

    </div>
  )
}

export default Body