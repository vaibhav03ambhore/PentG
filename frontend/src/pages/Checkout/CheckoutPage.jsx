
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
    mobile: '',
  });

  const {id}=useParams();

  const {data:painting, isLoading} = useGetSpecificPaintingQuery(id);    
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };


  const handlePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY", 
      amount: "50000", 
      currency: "INR",
      name: "PentG",
      description: "Purchase of Painting",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: shippingDetails.name,
        email: shippingDetails.email,
        contact: shippingDetails.mobile,
      },
      notes: {
        address: `${shippingDetails.village}, ${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}`,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  
  if(isLoading) return(<div>Loading </div>)
  return (
    <div className="min-h-screen bg-gray-900 flex flex-wrap md:flex-nowrap gap-5 p-10 w-full">
      <div className="bg-gray-800 md:px-6 md:py-20 sm:px-20 rounded-lg shadow-lg mb-6 w-full md:w-1/2 flex flex-col items-center">
        <h1 className="text-xl text-cyan-400 font-sans font-thin mb-4 md:mb-10">{painting?.name}</h1>
        <div className="min-w-30  md:w-full h-auto border-r-2 bg-slate-600 p-4 ">
          <img src={painting.image} alt={painting.name} className="object-contain w-full h-full" />
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 min-w-40 w-full md:w-1/2 ">
        <div className='flex flex-col items-center'>
          <h2 className="text-xl font-sans font-semibold  mb-4 text-yellow-400 ">Enter Shipping Details📃</h2> 
        </div>
        <form className="space-y-4 ">
          <div>
            <label className="block mb-2 text-sm md:text-md" htmlFor="name">Full Name</label>
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
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg shadow-lg w-full mt-5 text-sm md:text-md "
        >
          Place an Order
        </button>
      </div>
      
    </div>
  );
};

export default CheckoutPage;
