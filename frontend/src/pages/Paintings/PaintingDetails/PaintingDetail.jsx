import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { useGetSpecificPaintingQuery, useUpdatePaintingMutation } from '@/redux/api/paintings';
import { toast } from 'react-toastify';

const PaintingDetail = () => {
  const { id: pid } = useParams();
  const { data: painting, isLoading, error } = useGetSpecificPaintingQuery(pid);
  const [updatePainting,{isLoading:updateLoading,error:updateError}] = useUpdatePaintingMutation();

  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    medium: '',
    dimensions: '',
    yearCreated: '',
    price: '',
  });

  useEffect(() => {
    if (painting) {
      setFormData({
        name: painting.name || '',
        description: painting.description || '',
        medium: painting.medium || '',
        dimensions: painting.dimensions || '',
        yearCreated: painting.yearCreated || '',
        price: painting.price || '',
      });
    }
  }, [painting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      console.log(formData);
      await updatePainting({ id: pid, updatedPainting: formDataToSend });
      setEditMode(null);
    } catch (error) {
      console.error(error);
    }
  };

  const userInfo = localStorage.getItem('userInfo');
  const loggedInUserId = userInfo ? JSON.parse(userInfo)._id : null;

  const handleEdit = (field) => {
    setEditMode(field);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching painting details: {error.message}</div>;
  if (!painting) return <div>Painting not found</div>;

  if(updateError){
    toast.error(updateError.data);
  }

  const ownPainting = loggedInUserId === painting?.creator?._id;

  return (
    <div className="mt-10 md:mt-20 flex flex-col md:flex-row items-center gap-5 justify-evenly bg-gray-800 shadow-md rounded-lg">
      <div >
        <div className="flex gap-2 justify-center">
          <h1 className="text-lg underline font-semibold mb-6 mt-5 text-center md:text-2xl">
            {editMode === 'name' ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoFocus
                className="bg-gray-700 text-white px-2 py-1 outline-none border-b border-gray-500"
              />
            ) : (
              ownPainting?formData.name:painting.name
            )}
          </h1>
          {ownPainting && (
            <button className="hover:text-gray-300 text-gray-400 font-bold mx-2" onClick={() => handleEdit('name')}>
              <FaEdit />
            </button>
          )}
        </div>

        <div className="  bg-slate-600 p-2 mb-2  w-[400px] h-[300px]">
          <img
            className="w-full h-full  object-contain"
            src={painting.image}
            alt={painting.name}
          />
        </div>
      </div>
      <div>
        <div className="overflow-x-auto p-2">
          <h1 className='text-lg font-bold text-yellow-400 mb-4'>Painting Detatils👇</h1>
          <table className="min-w-full table-auto rounded-lg">
            <tbody className=''>
              <tr className="border-b border-gray-500 ">
                <td className="px-4 text-sm md:text-md  py-2 font-semibold bg-slate-700">Creator</td>
                <td className="px-4 py-2 text-sm md:text-md  bg-slate-900">{painting.creator.username}</td>
              </tr>
              <tr className="border-b border-gray-500">
                <td className="px-4 text-sm md:text-md py-2 font-semibold bg-slate-700">Price</td>
                <td className="px-4 py-2 text-sm md:text-md  bg-slate-900">
                  {editMode === 'price' ? (
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-gray-700 text-white px-2 py-1 outline-none border-b border-gray-500"
                    />
                  ) : (
                    `₹${ ownPainting?formData.price:painting.price.toLocaleString()}`
                  )}
                </td>
                {ownPainting && (
                  <button className="hover:text-gray-300 text-gray-400 font-bold mx-2" onClick={() => handleEdit('price')}>
                    <FaEdit />
                  </button>
                )}
              </tr>
              <tr className="border-b border-gray-500">
                <td className="px-4 text-sm md:text-md  py-2 font-semibold bg-slate-700">Description</td>
                <td className="px-4 text-sm md:text-md  py-2 bg-slate-900">
                  {editMode === 'description' ? (
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="bg-gray-700 text-white px-2 py-1 outline-none border-b border-gray-500"
                    />
                  ) : (
                    ownPainting?formData.description:painting.description
                  )}
                </td>
                {ownPainting && (
                  <button className="hover:text-gray-300 text-gray-400 font-bold mx-2" onClick={() => handleEdit('description')}>
                    <FaEdit />
                  </button>
                )}
              </tr>
              <tr className="border-b border-gray-500">
                <td className="px-4 text-sm md:text-md  py-2 font-semibold bg-slate-700">Year</td>
                <td className="px-4 text-sm md:text-md  py-2 bg-slate-900">
                  {editMode === 'yearCreated' ? (
                    <input
                      type='number'
                      name="yearCreated"
                      value={formData.yearCreated}
                      onChange={handleChange}
                      className="bg-gray-700 text-white px-2 py-1 outline-none border-b border-gray-500"
                    />
                  ) : (
                    ownPainting?formData.yearCreated:painting.yearCreated
                  )}
                </td>
                {ownPainting && (
                  <button className="hover:text-gray-300 text-gray-400 font-bold mx-2" onClick={() => handleEdit('yearCreated')}>
                    <FaEdit />
                  </button>
                )}
              </tr>
              <tr className="border-b border-gray-500">
                <td className="px-4 text-sm md:text-md  py-2 font-semibold bg-slate-700">Dimensions</td>
                <td className="px-4 text-sm md:text-md  py-2 bg-slate-900">
                  {editMode === 'dimensions' ? (
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="bg-gray-700 text-white px-2 py-1 outline-none border-b border-gray-500"
                    />
                  ) : (
                    ownPainting?formData.dimensions:painting.dimensions
                  )}
                </td>
                {ownPainting && (
                  <button className="hover:text-gray-300 text-gray-400 font-bold mx-2" onClick={() => handleEdit('dimensions')}>
                    <FaEdit />
                  </button>
                )}
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex justify-evenly'>
          {ownPainting ? (
            <div className="text-center sm:text-left mt-6">
              {editMode && (
                <button className="bg-blue-500 hover:bg-blue-700 text-sm md:text-md font-bold py-2 px-4 rounded mr-4" onClick={handleSave}>
                  {updateLoading ? 'Saving...' : 'Save Changes'}
                </button>
              )}
              <button className="bg-red-500  text-sm md:text-md hover:bg-red-700 font-bold py-2 px-4 rounded">
                Delete Painting
              </button>
            </div>
          ) : (
            <div className="text-center sm:text-left mt-6">
              <Link to={`/paintings/${pid}/checkout`}>
                <button className="bg-blue-500 hover:bg-blue-700  text-sm md:text-md font-bold py-2 px-4 rounded">
                  Buy Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaintingDetail;
