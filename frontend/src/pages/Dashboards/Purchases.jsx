import { Link } from "react-router-dom";
import { useGetUserOrdersQuery } from "../../redux/api/order";

const Purchases = () => {
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();
  if(error) return <div>{error?.data?.error}</div>
  if(isLoading) return <div>loading...</div>
  if(!orders) return <div>No orders..🙃</div>
  return (
    <div className=" justify-center items-center overflow-x-auto">
        <table className="container table-auto">
          <thead className="w-full border ">
            <tr className="mb-[5rem]  border-b border-yellow-800">
              <th className="text-center text-yellow-500 pl-2">ITEMS</th>
              <th className="text-center text-yellow-500 hidden md:table-cell pl-2">SELLER</th>
              <th className="text-center text-yellow-500 hidden sm:table-cell pl-2">DATE</th>
              <th className="text-center text-yellow-500 pl-2">TOTAL</th>
              <th className="text-center text-yellow-500 pl-2">PAYMENT</th>
              <th className="text-center text-yellow-500 pl-2">DELIVERY</th>
              <th className="text-center text-yellow-500 pl-2">DETAILS</th>
            </tr>
          </thead>

          <tbody className="text-sm font-thin md:font-light md:text-lg">
            {orders.map((order) => (
              <tr key={order?._id} >
                <td className="flex justify-center">
                  <img
                    src={order?.orderItem?.image}
                    alt={order?._id}
                    className="w-[5rem] pt-4"
                  />
                </td>

                <td className="text-center hidden md:table-cell pl-2 underline hover:text-sky-300 text-violet-400"><Link to={`/${order?.orderItem?.creator?._id}/profile`} >@{order?.orderItem?.creator?.username}</Link></td>

                <td className="text-center hidden sm:table-cell">
                  {order?.createdAt ? order?.createdAt?.substring(0, 10) : "N/A"}
                </td>

                <td className="text-center pl-4 sm:pl-2">${order?.totalPrice}</td>

                <td className="text-center pl-2">
                  {order.isPaid ? (
                    <p className=" ">
                     ✅Completed
                    </p>
                  ) : (
                    <p className="">
                      🛑Pending
                    </p>
                  )}
                </td>

                <td className="text-center pl-2">
                  {order.isDelivered ? (
                    <p className=" ">
                       ✅Completed
                    </p>
                  ) : (
                    <p className=" ">
                       🛑Pending
                    </p>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`} className="flex justify-center pl-2 cursor-pointer hover:text-violet-500">
                    <button className="italic">👁️Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
};

export default Purchases;
