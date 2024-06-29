import { Link } from "react-router-dom";

const Painting = ({ painting }) => {

return (
    <div className="overflow-hidden">
      <Link to={`/paintings/${painting._id}`} >
        <div className="relative pb-3/4 border border-b-slate-300 p-1 bg-slate-300"> 
          <img
            src={painting.image}
            alt={painting.name}
            className=" w-full h-full object-cover "
          />
        </div>

        <div className="flex justify-between items-center p-4">
            <span className="text-gray-200 hover:cursor-pointer hover:text-green-500 text-sm">Buy Now</span>
            <span className="bg-pink-500 hover:bg-pink-700 text-sm font-medium px-2.5 py-0.5 rounded">
              $ {painting.price}
            </span>
        </div>
        
      </Link>
    </div>
  );


};

export default Painting;



  