import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllPaintingsQuery } from '@/redux/api/paintings';

const Collection = () => {
    const { data: paintingData, isLoading,isError } = useGetAllPaintingsQuery();
    if (isLoading ) return <p>Loading...</p>; 
    if (isError) return <p>error retrieving paintings data</p>;
    if (!paintingData) return <p>No paintings found</p>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {paintingData?.map((painting) => (
        <Link to={`/paintings/${painting._id}`} key={painting._id}>
          <Card className="hover:bg-opacity-20 hover:bg-purple-500 transition-all duration-300 transform hover:scale-105 border border-slate-600">
            <CardHeader className="py-2">
              <CardTitle className="text-white text-md md:text-xl">{painting.name}</CardTitle>
            </CardHeader>
            <CardContent className='p-4 bg-yellow-900 my-2 mx-5 flex flex-col rounded-xl'>
              <img src={painting.image} alt={painting.name} className="w-full h-auto object-cover" />
              <CardDescription className='flex mt-3 bg-inherit'>
                <Link to={`/${painting?.creator?._id}/profile`} className='hover:underline text-cyan-200'>
                  <h1 className='text-cyan-300 hover:text-cyan-200 text-sm md:text-lg'>@{painting?.creator?.username || 'unknown'}</h1>
                </Link>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col-reverse sm:flex-row justify-between items-center px-4 ml-2">
              <button className="sm:text-lg text-sm hover:text-gray-200 hover:bg-purple-700 text-gray-300 px-2 py-1 rounded border-2 border-purple-700">
                Buy Now
              </button>
              <p className='bg-inherit text-pink-400 mr-4 text-sm sm:text-lg sm:font-bold'>${painting.price}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Collection;
