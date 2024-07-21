import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useCreateOrderMutation } from "../../redux/api/order";
import { clearOrderInfo } from "../../redux/features/orderInfo/orderSlice";
import { toast } from "react-toastify";

const PlaceOrder = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {orderInfo:order}=useSelector((state)=>state.order);
    const [createOrder,{isLoading,error}]=useCreateOrderMutation();
    
    const shippingCharge=(order?.orderItem?.price*10)/100;
    const totalPrice=shippingCharge+order?.orderItem?.price;
  
    const placeOrderHandler = async () => {
      try{
        const res=await createOrder({
          shippingDetails:order.shippingDetails,
          orderItem:order.orderItem._id,
          shippingCharge:order.shippingCharge,
          totalPrice:order.totalPrice,
          paymentMethod:order.paymentMethod
        }).unwrap();
        dispatch(clearOrderInfo());
        toast.success("order placed successfully!")
        navigate(`/order/${res._id}`);
      }catch(error){
        console.log(error);
        toast.error("please fill the shipping details correctly!");
        navigate(`/paintings/${order.orderItem._id}/checkout`)
      }
    };
    if(error) return(<>try later!!</>)
    if(!order) return(<>no data...</>)
  return (
    <div className="container flex flex-col md:flex-row justify-between gap-3  mt-8">
        <div className="border border-blue-800 p-4 rounded-lg w-full md:w-1/2">
          <h2 className="text-lg font-bold mb-4 text-yellow-500 text-center">Shipping</h2>
          <p className="mb-4 italic"><strong className="text-gray-200">Full Name:</strong> {order?.shippingDetails.fullName}</p>
          <p className="mb-4 italic"><strong className="text-gray-200">Mobile No:</strong> {order?.shippingDetails.mobile}</p>
          <p className="mb-4 italic"><strong className="text-gray-200">Address:</strong> {order?.shippingDetails.village}, {order?.shippingDetails.city} {order?.shippingDetails.pincode}, {order?.shippingDetails.state}</p>
          <p className="mb-4 italic"><strong className="text-gray-200">Method:</strong> {order?.paymentMethod}</p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="border border-blue-800 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-center text-yellow-500">Order Summary</h2>
            <div className="flex flex-col gap-1 justify-center items-center mt-3">
                <img
                  src={order?.orderItem?.image}
                  alt={order?.orderItem?.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <Link to={`/paintings/${order?.orderItem?._id}`} className="text-md font-semibold hover:underline">
                  {order?.orderItem?.name}
                </Link>
            </div>
            <div className="flex justify-between mb-2">
              <span>Painting Price</span>
              <span>${order?.orderItem?.price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Charge</span>
              <span>${shippingCharge}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
          <button
            type="button"
            className="hover:bg-blue-700 bg-blue-600 py-2 px-4 text-lg w-full mt-4"
            onClick={placeOrderHandler}
            >
            {isLoading?"wait...":"place order"}
          </button>
        </div>
    </div>
  );
};

export default PlaceOrder;
