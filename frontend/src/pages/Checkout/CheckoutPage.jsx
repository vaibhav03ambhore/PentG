
import React, { useState} from 'react';

import { useGetSpecificPaintingQuery } from '@/redux/api/paintings';
import { useParams } from 'react-router';

const CheckoutPage = () => {

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    village: '',
    city: '',
    state: '',
    pincode: '',
    email: '',
    mobile: '',
  });

  const {id}=useParams();

  const {data:painting, isLoading} = useGetSpecificPaintingQuery(id);    
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };


  // const handlePayment = async () => {
  //   const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  //   if (!res) {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     return;
  //   }

  //   const options = {
  //     key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
  //     amount: "50000", // Amount is in paisa (INR)
  //     currency: "INR",
  //     name: "PentG",
  //     description: "Purchase of Painting",
  //     handler: function (response) {
  //       alert(response.razorpay_payment_id);
  //       alert(response.razorpay_order_id);
  //       alert(response.razorpay_signature);
  //     },
  //     prefill: {
  //       name: shippingDetails.name,
  //       email: shippingDetails.email,
  //       contact: shippingDetails.mobile,
  //     },
  //     notes: {
  //       address: `${shippingDetails.village}, ${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}`,
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col gap-4 md:flex-row p-8 w-full">
      {/* <h1 className="text-3xl mb-6">Checkout</h1> */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 w-full flex flex-col justify-center items-center">
        <h1 className="text-xl text-cyan-400 font-sans font-semibold mb-4 md:mb-10">Painting Summary</h1>
        <div className="flex items-center flex-col gap-5 space-x-4">
          <div className="w-60 h-auto md:w-80 md:h-auto border-r-2 bg-slate-600 p-4 ">
            <img src={painting.image} alt={painting.name} className="" />

          </div>
          <div className='flex flex-col gap-3'>
            <p><span className='text-yellow-500 italic mr-3'>Name:</span> {painting.name}</p>
            <p><span className='text-yellow-500 italic mr-3' >Creator:</span> {painting.creator.username}</p>
            <p><span className='text-yellow-500 italic mr-3'>Price: </span> ₹{painting.price}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 w-full ">
        <div className='flex flex-col items-center'>
          <h2 className="text-xl font-sans font-semibold  mb-4 text-cyan-400 ">Shipping Details</h2> 
        </div>
        <form className="space-y-4">
          <div>
            <label className="block mb-2 text-sm md:text-md" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 rounded bg-gray-700 text-sm md:text-md"
              value={shippingDetails.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm md:text-md" htmlFor="village">Village</label>
            <input
              type="text"
              id="village"
              name="village"
              className="w-full p-2 rounded bg-gray-700 text-sm md:text-md"
              value={shippingDetails.village}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm md:text-md" htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full p-2 rounded bg-gray-700 text-sm md:text-md"
              value={shippingDetails.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm md:text-md" htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full p-2 rounded bg-gray-700 text-sm md:text-md"
              value={shippingDetails.state}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm md:text-md" htmlFor="pincode">Pincode</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              className="w-full p-2 rounded bg-gray-700 text-sm md:text-md"
              value={shippingDetails.pincode}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm md:text-md" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 rounded bg-gray-700 text-sm md:text-md"
              value={shippingDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm md:text-md" htmlFor="mobile">Mobile No.</label>
            <input
             type="tel"
             id="mobile"
             name="mobile"
             maxLength={10}
             className="w-full p-2 rounded bg-gray-700 text-sm md:text-md"
             value={shippingDetails.mobile}
             onChange={handleInputChange}
             onKeyPress={(e) => {
               // Allow only numbers to be entered
               const pattern = /[0-9]/;
               if (!pattern.test(e.key)) {
                 e.preventDefault();
               }
             }}
           />
          </div>
        </form>
        <button
          // onClick={handlePayment}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg shadow-lg w-full mt-5 text-sm md:text-md "
        >
          Pay with Razorpay
        </button>
      </div>
      
    </div>
  );
};

export default CheckoutPage;
