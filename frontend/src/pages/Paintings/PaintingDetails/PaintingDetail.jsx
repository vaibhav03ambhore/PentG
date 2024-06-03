import React from 'react';
import { useParams } from 'react-router-dom';
import i1 from '../../../assets/p4.jpg'; 

const paintingsData = [
  {
    _id: 1,
    name: "Starry Night",
    price: 25000,
    creator: "Vincent van Gogh",
    image: i1,
    status: "For Sale"
  },
  {
    _id: 2,
    name: "Mona Lisa",
    price: 100000000,
    creator: "Leonardo da Vinci",
    image: i1,
    status: "For Sale"
  },
  {
    _id: 3,
    name: "The Persistence of Memory",
    price: 15000000,
    creator: "Salvador Dali",
    image: i1,
    status: "For Sale"
  },
  {
    _id: 4,
    name: "The Scream",
    price: 80000000,
    creator: "Edvard Munch",
    image: i1,
    status: "For Sale"
  },
  {
    _id: 5,
    name: "Guernica",
    price: 200000000,
    creator: "Pablo Picasso",
    image: i1,
    status: "For Sale"
  }
];

const PaintingDetail = () => {
  const { id } = useParams();
  const painting = paintingsData.find(p => p._id === parseInt(id));

  if (!painting) {
    return <div>Painting not found</div>;
  }

  return (
    <div className="max-w-4xl flex flex-col items-center mx-auto p-6 bg-gray-800 shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left text-white">{painting.name}</h1>
      <img className="w-1/2 h-auto mb-6 rounded-md object-cover" src={painting.image} alt={painting.name} />
      <div className="text-center sm:text-left text-white">
        <p className="text-lg mb-4"><span className="font-semibold">Creator:</span> {painting.creator}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Price:</span> ${painting.price.toLocaleString()}</p>
      </div>
      <div className="text-center sm:text-left">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buy Now
        </button>
      </div>
    </div>                        
  );  
  
  
};

export default PaintingDetail;
