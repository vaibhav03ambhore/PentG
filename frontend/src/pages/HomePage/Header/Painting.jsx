import { Link } from "react-router-dom";

const Painting = ({ painting }) => {

return (
    <div className="overflow-hidden">
      <Link to={`/paintings/${painting._id}`} >
        <div className="relative pb-3/4"> {/* Adjust aspect ratio here if needed, e.g., pb-2/3 for a 3:2 ratio */}
          <img
            src={painting.image}
            alt={painting.name}
            className=" w-full h-full object-cover "
          />
        </div>

        <div className="flex justify-between items-center p-4">
            <span className="text-gray-200 text-sm">Buy Now</span>
            <span className="bg-pink-500 text-white text-sm font-medium px-2.5 py-0.5 rounded">
              $ {painting.price}
            </span>
        </div>
        
      </Link>
    </div>
  );


};

export default Painting;



  