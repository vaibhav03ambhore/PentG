import React from 'react';
import Pcard from './Pcard';
import i1 from '../../assets/p4.jpg' 
import { Link } from 'react-router-dom';
const Paintings = () => {

    const soldPaintings = [
        {
          _id: 1,
          name: "Starry Night",
          price: 25000,
          creator: "Vincent van Gogh",
          image:i1,
          status:"sold"
        },
        {
          _id: 2,
          name: "Mona Lisa",
          price: 100000000,
          creator: "Leonardo da Vinci",
          image:i1,
          status:"sold"
        },
        {
          _id: 3,
          name: "The Persistence of Memory",
          price: 15000000,
          creator: "Salvador Dali",
          image:i1,
          status:"sold"
        },
        {
          _id: 4,
          name: "The Scream",
          price: 80000000,
          creator: "Edvard Munch",
          image:i1,
          status:"sold"
        },
        {
          _id: 5,
          name: "Guernica",
          price: 200000000,
          creator: "Pablo Picasso",
          image:i1,
          status:"sold"
        }
    ];

    const forSalePaintings = [
      {
        _id: 1,
        name: "Starry Night",
        price: 25000,
        creator: "Vincent van Gogh",
        image:i1,
        status:"For Sale"
      },
      {
        _id: 2,
        name: "Mona Lisa",
        price: 100000000,
        creator: "Leonardo da Vinci",
        image:i1,
        status:"For Sale"
      },
      {
        _id: 3,
        name: "The Persistence of Memory",
        price: 15000000,
        creator: "Salvador Dali",
        image:i1,
        status:"For Sale"
      },
      {
        _id: 4,
        name: "The Scream",
        price: 80000000,
        creator: "Edvard Munch",
        image:i1,
        status:"For Sale"
      },
      {
        _id: 5,
        name: "Guernica",
        price: 200000000,
        creator: "Pablo Picasso",
        image:i1,
        status:"For Sale"
      }
  ];
   
  return (
    <div className='p-2 '>
      <button className="bg-blue-500 text-white px-4 py-2 rounded  mb-5">+ Add New Painting</button>
      <div className='flex  gap-5 flex-wrap'>
        <div className=' '>
          <h3 className="text-xl font-semibold mb-2">For Sale</h3>
          <div className="mb-4 flex flex-wrap ">
          {
            forSalePaintings.map((painting)=>(
              <Link to={`/paintings/${painting._id}`} key={painting._id}>
                <Pcard Painting={painting}/>
              </Link>
            ))
          }
          </div>
        </div>
        <div className=''>
          <h3 className="text-xl font-semibold mb-2">Sold</h3>    
          <div className="mb-2 flex flex-wrap ">
          {
            soldPaintings.map((painting)=>(
              <Link to={`/paintings/${painting._id}`} key={painting._id}>
                <Pcard Painting={painting}/>
              </Link>
            ))
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paintings;
