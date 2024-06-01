import Navbar from './pages/HomePage/Header/Navbar'

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className='bg-gray-900 text-gray-100 h-screen'>

      <ToastContainer />
      <div className="bg-black shadow-md sticky w-full z-10 top-0 px-4 py-4 border-b-2 border-gray-700">
          <Navbar/>
      </div>
      <main className="py-3">
        <Outlet />
      </main>

      
    </div>
  )
}

export default App









{/* <Routes>
        <Route path="/" element={<Header/>} />
      </Routes> */}


