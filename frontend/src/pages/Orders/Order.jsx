import { Link,useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React,{useEffect} from 'react';
import { toast } from "react-toastify";

import { useGetOrderByIdQuery } from "@/redux/api/order";
import { useUpdateOrderToDeliveredMutation } from "@/redux/api/order";
import { useUpdateOrderToPaidMutation } from "@/redux/api/order";
import { useGetPayPalClientIdQuery } from "@/redux/api/order";
import { useSelector } from "react-redux";

const Order = () => {

  const {id:orderId}=useParams();

  const {data:order,isLoading,error,refetch}=useGetOrderByIdQuery(orderId)
  const {data:paypal,isLoading:paypalLoading,error:paypalError}=useGetPayPalClientIdQuery();
  const [updateOrderToPaid]=useUpdateOrderToPaidMutation();
  const [updateOrderToDelivered,{isLoading:loadingDeliver}]=useUpdateOrderToDeliveredMutation();

  const [{ isPending },paypalDispatch] = usePayPalScriptReducer();

  const {userInfo}=useSelector((state)=>state.auth);
  const paintingOwnerId=order?.orderItem?.creator;

  const loggedInUserId=userInfo?._id;
  
  useEffect(() => {
    if (!paypalError && !paypalLoading && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [paypalError,paypalLoading, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await updateOrderToPaid({ orderId, details });
        console.log(orderId,details)
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value:order?.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    console.log("onError::",err);
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await updateOrderToDelivered(orderId);
    refetch();
  };


  if(error)return(<div className="m-10 p-4 text-lg">try later..</div>);
  if(isLoading) return(<div className="m-10 p-4 text-lg">Loading...</div>)
  if(!order) return(<div className="m-10 p-4 text-lg">no orders found!</div>)

  return (
    <div className="p-4 m-6 flex flex-col md:flex-row gap-4 justify-between ">
      <div className="flex flex-col gap-8 w-full md:w-2/3">
        <div className="border border-gray-700 p-4 rounded-lg">
          <table className="w-full">
            <thead className="border-b-2 border-gray-700 text-sky-500">
              <tr className="text-md hidden sm:table-row">
                <th className="p-2 text-center">Image</th>
                <th className="p-2 text-center">Product</th>
                <th className="p-2 text-center">Unit Price</th>
                <th className="p-2 text-center">Shipping Charge</th>
                <th className="p-2 text-center">Total</th>
              </tr>
              <tr className="text-md table-row sm:hidden">
                <th className="p-2 text-left">Attribute</th>
                <th className="p-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hidden sm:table-row ">
                <td className="p-2 flex justify-center">
                  <img
                    src={order.orderItem.image}
                    alt={order.orderItem.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-2 text-center">
                  <Link to={`/paintings/${order.orderItem._id}`} className="hover:underline">{order.orderItem.name}</Link>
                </td>
                <td className="p-2 text-center">${order.orderItem.price}</td>
                <td className="p-2 text-center">${order.shippingCharge}</td>
                <td className="p-2 text-center">${order.totalPrice}</td>
              </tr>
              <tr className="table-row sm:hidden">
                <td className="p-2 text-left">Image</td>
                <td className="p-2 flex justify-start">
                  <img
                    src={order.orderItem.image}
                    alt={order.orderItem.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
              </tr>
              <tr className="table-row sm:hidden">
                <td className="p-2 text-left">Title</td>
                <td className="p-2 text-left">
                  <Link to={`/paintings/${order.orderItem._id}`} className="hover:underline italic">{order.orderItem.name}</Link>
                </td>
              </tr>
              <tr className="table-row sm:hidden">
                <td className="p-2 text-left">Price</td>
                <td className="p-2 text-left">${order.orderItem.price}</td>
              </tr>
              <tr className="table-row sm:hidden">
                <td className="p-2 text-left">Shipping charge</td>
                <td className="p-2 text-left">${order.shippingCharge}</td>
              </tr>
              <tr className="table-row sm:hidden">
                <td className="p-2 text-left">Total</td>
                <td className="p-2 text-left">${order.totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-gray-700 p-4 rounded-lg">
          <h2 className="text-xl text-yellow-500 font-bold mb-2 text-center">Shipping</h2>
          <p className="mb-4 text-green-200 "><strong className="text-gray-200">Order ID:</strong> {order._id}</p>
          <p className="mb-4 text-green-200 "><strong className="text-gray-200">Full Name:</strong> {order.shippingDetails.fullName}</p>
          <p className="mb-4 text-green-200 "><strong className="text-gray-200">Address:</strong> {order.shippingDetails.village}, {order.shippingDetails.city} {order.shippingDetails.pincode}, {order.shippingDetails.state}</p>
          <p className="mb-4 text-green-200 "><strong className="text-gray-200">Method:</strong> {order.paymentMethod}</p>
          {order.isPaid ? (
            <div className="text-green-500 mb-4">Paid on {order.paidAt}</div>
          ) : (
            <div className="text-red-500 mb-4">Not paid</div>
          )}
          {order.isDelivered ?(
            <div className="text-green-500">Delivered on {order.deliveredAt}</div>
           ):(
            <div className="text-red-500">Not Delivered</div>
           )
          }
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
          {!order.isPaid && (paintingOwnerId!==loggedInUserId )&&(
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
          {paintingOwnerId==loggedInUserId && order.isPaid && !order.isDelivered && (
            <div>
              <button
                type="button"
                className="bg-pink-500 text-white w-full py-2 mt-2 rounded-lg"
                onClick={deliverHandler}
              >
                {loadingDeliver?"marking..":"Mark As Delivered"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
