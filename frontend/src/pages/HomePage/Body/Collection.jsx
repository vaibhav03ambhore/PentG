import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { useGetAllPaintingsToSellQuery } from '../../../redux/api/paintings';

const Collection = () => {
  const { data: paintingData, isLoading, isError, error } = useGetAllPaintingsToSellQuery();
  const [sortedPaintings, setSortedPaintings] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    if (paintingData) {
      let sortedData = [...paintingData];
      if (sortOrder === 'low-high') {
        sortedData.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'high-low') {
        sortedData.sort((a, b) => b.price - a.price);
      }
      setSortedPaintings(sortedData);
    }
  }, [paintingData, sortOrder]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return (<div>{error?.data?.error}</div>);
  if (isError) return (<div>Error in fetching data!! </div>);

  return (
    <div>
      <div className="flex justify-end mb-4 mx-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-600 bg-gray-800 text-white rounded"
        >
          <option value="default">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 md:mx-6">
        {sortedPaintings.map((painting) => (
          <Link to={`/paintings/${painting?._id}`} key={painting?._id}>
            <Card className="hover:bg-opacity-20 hover:bg-purple-500 transition-all duration-300 transform hover:scale-105 border border-slate-600">
              <CardHeader className="">
                <CardTitle className="text-md font-light text-sm md:text-xl mx-auto">{painting?.name}</CardTitle>
              </CardHeader>
              <CardContent className=' mx-auto sm:mx-4 flex flex-col '>
                <div className='max-w-80 h-20 md:h-60 p-2 border border-slate-700 bg-pink-400 bg-opacity-40'>
                  <img src={painting?.image} alt={painting?.name} className="w-full h-full object-contain" />
                </div>
                <CardDescription className='mt-2 md:mt-3 '>
                  <Link to={`/${painting?.creator?._id}/profile`} className='hover:underline text-cyan-200'>
                    <h1 className='text-cyan-300 hover:text-cyan-200 font-semibold text-sm md:text-lg'>@{painting?.creator?.username || 'unknown'}</h1>
                  </Link>
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col-reverse sm:flex-row justify-between items-center px-8">
                <button className="sm:text-lg text-sm hover:text-gray-200 hover:bg-purple-700 text-gray-300 px-2 py-1 rounded border-2 border-purple-700">
                  Buy Now
                </button>
                <p className=' text-pink-400  text-sm sm:text-lg sm:font-bold'>${painting?.price}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collection;
