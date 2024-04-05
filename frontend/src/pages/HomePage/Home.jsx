import React from 'react'
import Carousell from './Header/Carousal'
import Body from './Body/Body'
import Navbar from './Header/Navbar'
import Footer from './Footer/Footer'
import { useParams } from'react-router-dom'

const Home = () => {
  const { keyword } = useParams();
  console.log(keyword);
  return (
    <div >
        <div className="bg-black shadow-md fixed w-full z-10 top-0 px-4 py-4 ">
          <Navbar/>
        </div>
        <div className='flex flex-col justify-between gap-0  h-screen mx-8 py-4'>
          <Carousell/>
          <Body/>
          <Footer/>
        </div>
       
    </div>
  )
}

export default Home