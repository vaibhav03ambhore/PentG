import React from 'react';
import Pcard from './Pcard';
import { Link, useParams } from 'react-router-dom';
import {useGetAllSoldPaintingsByCreatorQuery,useGetAllForSalePaintingsByCreatorQuery} from '@/redux/api/paintings';

const Paintings = () => {

  const {id:userId}=useParams();

  const {data:soldPaintings}= useGetAllSoldPaintingsByCreatorQuery(userId);
  const {data: forSalePaintings} = useGetAllForSalePaintingsByCreatorQuery(userId);

  return (
    <div className='p-2'>
      <Link to="/add-painting" className="block mb-5">
        <button className="bg-blue-500 px-4 py-2 rounded">+ Add New Painting</button>
      </Link>
      <div className='flex gap-5 flex-wrap'>
        <div className='bg-gray-800 p-4 rounded-md'>
          <h3 className="text-xl font-semibold text-white mb-2">For Sale</h3>
          <div className="mb-4 flex flex-wrap">
            {forSalePaintings.map((painting) => (
              <Link to={`/paintings/${painting._id}`} key={painting._id}>
                <Pcard painting={painting} />
              </Link>
            ))}
          </div>
        </div>
        <div className='bg-gray-800 p-4 rounded-md'>
          <h3 className="text-xl font-semibold text-white mb-2">Sold</h3>
          <div className="mb-2 flex flex-wrap">
            {soldPaintings.map((painting) => (
              <Link to={`/paintings/${painting._id}`} key={painting._id}>
                <Pcard painting={painting} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paintings;
