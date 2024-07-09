import { Link } from "react-router-dom";

const PlaceOrder = () => {
    const order = {
        shippingDetails: {
          fullName: "vaibhav ity",
          village: "uti",
          city: "une",
          state: "mhas",
          pincode: 123465,
          mobile: 1212121212
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
  const placeOrderHandler = async () => {

  };

  return (
    <div className="container flex flex-col md:flex-row justify-between gap-3  mt-8">
        <div className="border border-gray-700 p-4 rounded-lg w-full md:w-1/2">
          <h2 className="text-lg font-bold mb-4 text-yellow-500 text-center">Shipping</h2>
          <p className="mb-4 italic"><strong className="text-gray-200">Full Name:</strong> {order.shippingDetails.fullName}</p>
          <p className="mb-4 italic"><strong className="text-gray-200">Mobile No:</strong> {order.shippingDetails.mobile}</p>
          <p className="mb-4 italic"><strong className="text-gray-200">Address:</strong> {order.shippingDetails.village}, {order.shippingDetails.city} {order.shippingDetails.pincode}, {order.shippingDetails.state}</p>
          <p className="mb-4 italic"><strong className="text-gray-200">Method:</strong> {order.paymentMethod}</p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="border border-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-center text-yellow-500">Order Summary</h2>
            <div className="flex flex-col gap-1 justify-center items-center mt-3">
                <img
                  src={order.orderItem.image}
                  alt={order.orderItem.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <Link to={`/painting/${order.orderItem._id}`} className="text-md font-semibold hover:underline">
                  {order.orderItem.name}
                </Link>
            </div>
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
          </div>
          <button
            type="button"
            className="hover:bg-blue-700 bg-blue-600 py-2 px-4 text-lg w-full mt-4"
            onClick={placeOrderHandler}
            >
            Place Order
          </button>
        </div>
    </div>
  );
};

export default PlaceOrder;
