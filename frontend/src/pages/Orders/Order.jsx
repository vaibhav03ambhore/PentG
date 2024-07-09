import { Link } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React from 'react';

const mockOrder = {
  shippingDetails: {
    fullName: "vaibhav ity",
    village: "uti",
    city: "une",
    state: "mhas",
    pincode: 123465,
    mobile: 1212121212
  },
  paymentResult: {
    id: "PAYMENT_ID",
    status: "paid",
    update_time: "2024-07-06T12:34:56Z",
    email_address: "payer@example.com"
  },
  _id: "668d1761e08e48d513c78ac4",
  user: {
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: ""
    },
    _id: "6689517d5d25daaf36b51af4",
    profilePicture: " https://th.bing.com/th?id=OIP.Aa3B6uwjU0BFoZrAQG7GzQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
    username: "john_doe",
    email: "vaibhav@gmail.com",
    phoneNumber: "",
    password: "$2a$10$vM692VmV/eh9c4KO52TqEOz80WHv9MuaEBtd.6GfAbHunO9SL93ZG",
    createdAt: "2024-07-06T14:15:25.809Z",
    updatedAt: "2024-07-06T14:15:25.809Z",
    __v: 0
  },
  orderItem: {
    _id: "668160767656291365ad76ba",
    name: "Mona lsidlfskdf",
    description: "sdfsddddddddddddddd",
    creator: "6681480f9bed9cb9902f0af4",
    price: 343,
    image: "https://res.cloudinary.com/vaibhavdada/image/upload/v1719754837/PenGProject/Paintings/ohfxrdgd0r1rkampjtne.png",
    status: "Sold",
    medium: "Acrylic",
    dimensions: "22x11 cm",
    yearCreated: 2000,
    isAgreedToTerms: false,
    createdAt: "2024-06-30T13:41:10.676Z",
    updatedAt: "2024-06-30T13:41:10.676Z",
    __v: 0
  },
  shippingCharge: 50,
  totalPrice: 393,
  paymentMethod: "PayPal",
  isPaid: false,
  isDelivered: false,
  createdAt: "2024-07-09T10:56:33.230Z",
  updatedAt: "2024-07-09T11:21:11.163Z",
  __v: 0,
  paidAt: null,
  deliveredAt: null
}

const Order = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  function onApprove() {
    console.log('Payment approved');
  }

  function createOrder() {
    console.log('Created order');
  }

  function onError(err) {
    console.error(err.message);
  }

  const deliverHandler = async () => {
    console.log('Delivered');
  };

  const order = mockOrder;
  const userInfo = { isAdmin: true };

  return (
    <div className="p-4 m-6 flex flex-col md:flex-row gap-4 justify-between ">
      <div className="flex flex-col gap-8 w-full md:w-2/3">
        <div className="border border-gray-700 p-4 rounded-lg">
          <table className="w-full">
            <thead className="border-b-2 border-gray-700 text-sky-500">
              <tr className="text-md">
                <th className="p-2 text-center">Image</th>
                <th className="p-2 text-center">Product</th>
                <th className="p-2 text-center">Unit Price</th>
                <th className="p-2 text-center">Shipping Charge</th>
                <th className="p-2 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 flex justify-center">
                  <img
                    src={order.orderItem.image}
                    alt={order.orderItem.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-2 text-center">
                  <Link to={`/painting/${order.orderItem._id}`} className="hover:underline">{order.orderItem.name}</Link>
                </td>
                <td className="p-2 text-center">${order.orderItem.price}</td>
                <td className="p-2 text-center">${order.shippingCharge}</td>
                <td className="p-2 text-center">${order.totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-gray-700 p-4 rounded-lg">
          <h2 className="text-xl text-yellow-500 font-bold mb-2 text-center">Shipping</h2>
          <p className="mb-4 text-green-200 "><strong className="text-gray-200">Order:</strong> {order._id}</p>
          <p className="mb-4 text-green-200 "><strong className="text-gray-200">Full Name:</strong> {order.shippingDetails.fullName}</p>
          <p className="mb-4 text-green-200 "><strong className="text-gray-200">Address:</strong> {order.shippingDetails.village}, {order.shippingDetails.city} {order.shippingDetails.pincode}, {order.shippingDetails.state}</p>
          <p className="mb-4 text-green-200 "><strong className="text-gray-200">Method:</strong> {order.paymentMethod}</p>
          {order.isPaid ? (
            <div className="text-green-500">Paid on {order.paidAt}</div>
          ) : (
            <div className="text-red-500">Not paid</div>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <div className="border border-gray-700 p-4 rounded-lg">
          <h2 className="text-xl text-yellow-500 font-bold mb-2 text-center">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Painting Price</span>
            <span>${order.orderItem.price}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping Charge</span>
            <span>${order.shippingCharge}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span>${order.totalPrice}</span>
          </div>
          {!order.isPaid && (
            <div>
              {isPending ? (
                <div>Loading...</div>
              ) : (
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                </div>
              )}
            </div>
          )}
          {userInfo && order.isPaid && !order.isDelivered && (
            <div>
              <button
                type="button"
                className="bg-pink-500 text-white w-full py-2 mt-2 rounded-lg"
                onClick={deliverHandler}
              >
                Mark As Delivered
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
