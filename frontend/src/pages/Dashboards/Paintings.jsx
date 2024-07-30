import React from 'react';
import Pcard from './Pcard';
import { Link, useParams } from 'react-router-dom';
import {useGetAllSoldPaintingsByCreatorQuery,useGetAllForSalePaintingsByCreatorQuery} from '../../redux/api/paintings';

const Paintings = () => {

  const {id:userId}=useParams();

  const {data:soldPaintings,isLoading:soldPaintingsLoading,error:error1}= useGetAllSoldPaintingsByCreatorQuery(userId);
  const {data: forSalePaintings,isLoading:toSalePaintingsLoading,error:error2} = useGetAllForSalePaintingsByCreatorQuery(userId);

  const userInfo=localStorage.getItem('userInfo')
  const loggedInUserId = userInfo?JSON.parse(userInfo)._id:null;
  const isOwnDashboard = userId === loggedInUserId;

  if(error1 || error2) return (<div>🕸️No Data and No User found!!</div>);

  return (
    <div className='p-4 flex flex-col gap-2'>
      {
        isOwnDashboard&&(
          <Link to="/add-painting" className="p-2 ml-0 mx-auto">
            <button className="bg-blue-500 px-4 py-2 rounded">+ Add New Painting</button>
          </Link>
        )
      }
      <div className='flex flex-col gap-5 flex-wrap'>
        <div className='bg-gray-800 p-4 rounded-md'>
          <h3 className="text-xl font-semibold text-white mb-2">For Sale</h3>
          <div className="mb-4 flex flex-wrap">
            {toSalePaintingsLoading?<div className='text-gray-300'>loading...</div> :forSalePaintings.map((painting) => (
              <Link to={`/paintings/${painting._id}`} key={painting._id}>
                <Pcard painting={painting} />
              </Link>
            ))}
            {forSalePaintings?.length === 0 && <div className="italic">No paintings for sale</div>}
          </div>
        </div>
        <div className='bg-gray-800 p-4 rounded-md'>
          <h3 className="text-xl font-semibold text-white mb-2">Sold</h3>
          <div className="mb-2 flex flex-wrap">
            {soldPaintingsLoading?<div className='text-gray-300'>loading...</div>:soldPaintings.map((painting) => (
              <Link to={`/paintings/${painting._id}`} key={painting._id}>
                <Pcard painting={painting} />
              </Link>
            ))}
            {soldPaintings?.length === 0 && <div className="italic">No sold paintings</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paintings;
