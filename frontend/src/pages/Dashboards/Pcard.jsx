import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pcard = (painting) => {
  console.log(painting)
  console.log(typeof(painting))
  
  return (
    <div className='p-2 flex '>
        <Card className=" h-[230px] w-[200px] border-slate-600  ">
            <CardHeader className="py-2">
                <CardTitle className="text-white text-md md:text-xl">{painting.name}</CardTitle>
            </CardHeader>
            <CardContent className='p-4  bg-yellow-900  my-2 mx-5 flex flex-col rounded-xl'>
                <img src={painting.image} alt={painting.name} className="w-full h-auto object-cover" />
            </CardContent>
            <CardFooter className="flex flex-col-reverse sm:flex-row justify-between items-center px-4 ml-2">
                <button className=" sm:text-lg text-sm hover:text-gray-200 hover:bg-purple-700 text-gray-300 px-2 py-1 rounded border-2 border-purple-700">
                    {painting.status}
                </button>
                <p className='bg-inherit text-pink-400 mr-4 text-sm sm:text-lg sm:font-bold'>${painting.price}</p>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Pcard