import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSpecificPaintingQuery } from '../../redux/api/paintings';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderInfo } from '../../redux/features/orderInfo/orderSlice';

import { useParams } from 'react-router';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {orderInfo} = useSelector((state) => state.order);
  const { data: painting, isLoading } = useGetSpecificPaintingQuery(id);

  const [shippingDetails, setShippingDetails] = useState(orderInfo?.shippingDetails || {
    fullName: "",
    village: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setOrderInfo({ ...orderInfo, shippingDetails: shippingDetails ,orderItem:painting, paymentMethod:paymentMethod}));
    setShippingDetails(" ");
    navigate("/place-order");
  };

  useEffect(() => {
    if (!orderInfo?.shippingDetails && !orderInfo?.orderItem) {
      navigate(`/paintings/${id}/checkout`);
    }
  }, [id, navigate, orderInfo?.shippingDetails, orderInfo?.orderItem]);

  if (isLoading) return (<div>Loading</div>);
  if (!painting) return (<div>Painting not found</div>);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-wrap md:flex-nowrap gap-5 p-10 w-full">
      <div className="bg-gray-800 md:px-6 md:py-20 sm:px-20 rounded-lg shadow-lg mb-6 w-full md:w-1/2 flex flex-col items-center">
        <h1 className="text-xl text-cyan-400 font-sans font-thin mb-4 md:mb-10">{painting.name}</h1>
        <div className="min-w-30 md:w-full h-auto border-r-2 bg-slate-600 p-4 ">
          <img src={painting.image} alt={painting.name} className="object-contain w-full h-full" />
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 min-w-40 w-full md:w-1/2 ">
        <div className='flex flex-col items-center'>
          <h2 className="text-xl font-sans font-semibold  mb-4 text-yellow-400 ">Enter Shipping Details📃</h2>
        </div>
        <form className="space-y-4 " onSubmit={submitHandler}>
          <div>
            <label className="block mb-2 text-sm md:text-md" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              placeholder='e.g vaibhav ambhore'
              className="w-full p-2 rounded bg-gray-700 text-sm md:text-md"
              value={shippingDetails.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm md:text-md" htmlFor="village">Village</label>
            <input
              type="text"
              id="village"
              name="village"
              placeholder='e.g solapur'
              required
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
              placeholder='e.g pune'
              required
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
              placeholder='e.g maharastra'
              required
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
              placeholder='e.g 443304'
              required
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
              required
              placeholder='e.g 9356620231'
              minLength={10}
              maxLength={10}
              className="w-full p-2 rounded bg-gray-700 text-sm md:text-md"
              value={shippingDetails.mobile}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                const pattern = /[0-9]/;
                if (!pattern.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Select Method</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">PayPal or Credit Card</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg shadow-lg w-full mt-5 text-md md:text-lg"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
