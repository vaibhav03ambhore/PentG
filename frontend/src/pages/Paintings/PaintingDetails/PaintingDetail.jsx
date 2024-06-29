import React from 'react';
import { useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { useGetSpecificPaintingQuery } from '@/redux/api/paintings';

const PaintingDetail = () => {

  const [editMode, setEditMode] = useState(null); 
  const [editedValue, setEditedValue] = useState('');
  
  const {id}=useParams();

  const { data: painting, isLoading } = useGetSpecificPaintingQuery(id);


  let user ;
  // user= 'vaibhav'; 

  if (!painting) {
    return <div>Painting not found</div>;
  }

  const handleEdit = (field) => {
    setEditMode(field);
    setEditedValue(painting[field]);
  };

  const handleSave = () => {
    // Implement logic to save the edited value
    // For example, update the painting object in state or send a request to the server
    // After saving, reset edit mode
    console.log(`Saving ${editMode}: ${editedValue}`);
    setEditMode(null);
  };

  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center p-6 bg-gray-800 shadow-md rounded-lg ">
      <div className='flex gap-2'>
        <h1 className="text-xl font-bold mb-6 mt-5 text-center md:text-3xl">
          {editMode === 'name' ? (
            <input
              type="text"
              value={editedValue}
              onChange={handleChange}
              autoFocus
              className="bg-gray-700 text-white px-2 py-1 outline-none border-b border-gray-500"
            />
          ) : (
            painting.name
          )}
        </h1>
        {user === 'vaibhav' && (
          <button className="hover:text-gray-300 text-gray-400 font-bold mx-2" onClick={() => handleEdit('name')}>
            <FaEdit />
          </button>
        )}
      </div>

      <div className='flex justify-center mt-5'>
        {editMode === 'image' ? (
          <input
            type="file"
            onChange={(e) => {
              // Implement logic to handle file upload
            }}
          />
        ) : (
          <img
            className="w-2/3 sm:w-1/2 h-auto mb-6 object-cover rounded-lg shadow-md"
            src={painting.image}
            alt={painting.name}
          />
        )}
        <div className="">
          {user === 'vaibhav' && (
            <button className="hover:text-gray-300 text-gray-400 font-bold mx-2" onClick={() => handleEdit('image')}>
              <FaEdit />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto p-2">
        <table className="min-w-full table-auto bg-gray-700 rounded-lg">
          <tbody className=''>
            <tr className="border-b border-gray-500">
              <td className="px-4 py-2 font-semibold bg-slate-700">Creator:</td>
              <td className="px-4 py-2 bg-slate-900">
                {editMode === 'creator' ? (
                  <input
                    type="text"
                    value={editedValue}
                    onChange={handleChange}
                    className="bg-gray-700 text-white px-2 py-1 outline-none border-b border-gray-500"
                  />
                ) : (
                  painting.creator
                )}
              </td>
              {user === 'vaibhav' && (
                <button className="hover:text-gray-300 text-gray-400 font-bold mx-2" onClick={() => handleEdit('creator')}>
                  <FaEdit />
                </button>
              )}
            </tr>
            <tr className="border-b border-gray-500">
              <td className="px-4 py-2 font-semibold bg-slate-700">Price:</td>
              <td className="px-4 py-2 bg-slate-900">
                {editMode === 'price' ? (
                  <input
                    type="text"
                    value={editedValue}
                    onChange={handleChange}
                    className="bg-gray-700 text-white px-2 py-1 outline-none border-b border-gray-500"
                  />
                ) : (
                  `$${painting.price.toLocaleString()}`
                )}
              </td>
              {user === 'vaibhav' && (
                <button className="hover:text-gray-300 text-gray-400 font-bold mx-2" onClick={() => handleEdit('price')}>
                  <FaEdit />
                </button>
              )}
            </tr>
            <tr className="border-b border-gray-500 ">
              <td className="px-4 py-2 font-semibold bg-slate-700">Description:</td>
              <td className="px-4 py-2 bg-slate-900">
                {editMode === 'description' ? (
                  <textarea
                    value={editedValue}
                    onChange={handleChange}
                    className="bg-gray-700 text-white px-2 py-1 outline-none border-b border-gray-500"
                  />
                ) : (
                  painting.description
                )}
              </td>
              {user === 'vaibhav' && (
                <button className="hover:text-gray-300 text-gray-400 font-bold mx-2" onClick={() => handleEdit('description')}>
                  <FaEdit />
                </button>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      {user === 'vaibhav' ? (
        <div className="text-center sm:text-left mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleSave}>
            Save Changes
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete Painting
          </button>
        </div>
      ) : (
        <div className="text-center sm:text-left mt-6">
          
          <Link to={`/paintings/${id}/checkout`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Buy Now
            </button>
          </Link>
        
        </div>
      )}
    </div>
  );
};

export default PaintingDetail;
