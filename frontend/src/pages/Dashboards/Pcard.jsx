import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pcard = ({ painting }) => {
  
  return (
    <div className='p-2 flex bg-gray-900 m-3'>
        <Card className="border-gray-600 rounded-xl flex flex-col items-center">
            <CardHeader className="">
                <CardTitle className="text-xl ">{painting.name}</CardTitle>
            </CardHeader>
            <CardContent className=''>
                <img src={painting.image} alt={painting.name} className="w-[150px] h-full object-cover" />
            </CardContent>
            <CardFooter className={`bg-gray-800 rounded-b-xl w-full p-2 flex ${painting.status === 'sold' ? 'justify-between ' : 'justify-center'} `}>
                <p className={`font-semibold text-blue-400 ${painting.status === 'sold' ? 'line-through ' : ''}`} >${painting.price}</p>
                {painting.status === 'sold' && <p className='bg-red-500 rounded-xl px-3 py-1'>{painting.status}</p>}
            </CardFooter>
        </Card>
    </div>
  )
}

export default Pcard
