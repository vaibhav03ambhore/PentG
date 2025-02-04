import React from 'react'
import Carousell from './Header/Carousal'
import Body from './Body/Body'
import Footer from './Footer/Footer'

const Home = () => {
  return (
    <div >
        <div className='flex flex-col gap-4  h-screen  py-2'>
          <Carousell/>
          <Body/>
          <Footer/>
        </div>
       
    </div>
  )
}

export default Home