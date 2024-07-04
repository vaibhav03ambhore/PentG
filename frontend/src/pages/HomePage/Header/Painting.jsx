import { Link } from "react-router-dom";

const Painting = ({ painting }) => {

return (
    <div className=" mb-0 flex flex-col justify-between h-full w-full ">
      <Link to={`/paintings/${painting._id}` } >
        <div className="p-2 bg-slate-700 h-36 md:h-44 w-full max-w-80"> 
          <img
            src={painting.image}
            alt={painting.name}
            className=" w-full h-full object-contain"
          />
        </div>
      </Link>

        <div className="flex justify-around items-center pt-4 ">
            <Link to={`/paintings/${painting._id}/checkout` }>
               <span className="text-gray-200 hover:cursor-pointer hover:bg-purple-500 px-1 py-1 hover:text-green-200 text-sm">Buy Now</span>
            </Link>
            <span className="bg-pink-500 hover:bg-pink-700 text-sm font-medium px-2.5 py-0.5 rounded">
              ₹ {painting.price}
            </span>
        </div>
        
    </div>
  );


};

export default Painting;



  