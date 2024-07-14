import Purchases from "./Purchases";
import Sells from "./Sells";

const OrderList = () => {

    return (
        <div className="m-4 px-4 overflow-x-auto">
            <div className="flex flex-col gap-8 ">
                <div className="mt-4 border border-blue-800 rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Your Purchases</h2>
                    <Purchases />
                </div>
                <div className="mt-4 border border-blue-800 rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Your Sells</h2>
                    <Sells />
                </div>
            </div>
        </div>
    );
};

export default OrderList;
