import React, { useState } from 'react';
import {useCreatePaintingMutation} from '../../../redux/api/paintings';
import {  useNavigate } from 'react-router';
import { toast } from 'react-toastify';


const PaintingForm = () => {
  const [createPainting, { isLoading }] = useCreatePaintingMutation();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    medium: '',
    dimensions: '',
    yearCreated: '',
    price: '',
    image: null,
    agreeTerms: false
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value, type,files, checked } = e.target;
    if(type==='file'){
      setFormData(prevData=>({
        ...prevData,
        [name]: files[0]
      }))
    }else{
      setFormData(prevData => ({
        ...prevData,    
        [name]: type === 'checkbox' ? checked :value
      }));
    }
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      await createPainting(formDataToSend).unwrap();

      setFormData({
        name: '',
        description: '',
        medium: '',
        dimensions: '',
        yearCreated: null,
        price: null,
        image: null,
        agreeTerms: false
      });
      toast.success('painting uploaded successfully!');
      navigate('/paintings');
      window.location.reload();
      
    }catch(error){
      toast.error(error?.data?.message||error?.data?.error||'Error uploading painting');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-center mb-4">Fill Form</h1>
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold mb-2 text-sm md:text-md ">Name:</label>
        <input type="text" id="name" name="name" placeholder="e.g Mona Lisa" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-sm md:text-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-2 text-sm md:text-md">Description:</label>
        <textarea id="description" name="description" placeholder="Enter painting description" value={formData.description} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-sm md:text-md"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="medium" className="block  font-semibold mb-2 text-sm md:text-md">Medium:</label>
        <select id="medium" name="medium" value={formData.medium} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-sm md:text-md">
          <option value="">Select medium</option>
          <option value="Oil">Oil</option>
          <option value="Watercolor">Watercolor</option>
          <option value="Acrylic">Acrylic</option>
          {/* more options */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dimensions" className="block font-semibold mb-2 text-sm md:text-md">  (Height x Width in inches or centimeters):</label>
        <input type="text" id="dimensions" name="dimensions" placeholder="e.g 22x23 cm" value={formData.dimensions} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-sm md:text-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="yearCreated" className="block font-semibold mb-2 text-sm md:text-md">Year Created:</label>
        <input type="number" min="1900" max="2099" step="1"  id="yearCreated" name="yearCreated" placeholder='e.g 2022'  value={formData.yearCreated} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-sm md:text-md" />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block  font-semibold mb-2 text-sm md:text-md">Price ($):</label>
        <input type="number" min="1" max="20000000" step="1" id="price" name="price" placeholder="e.g 44" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-sm md:text-md " />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block  font-semibold mb-2 text-sm md:text-md">Upload Image:</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-sm md:text-md " />
      </div>
      <div className="mb-4">
        <label htmlFor="agreeTerms" className="inline-flex items-center">
          <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required className="mr-2" />
          <span className="text-sm text-gray-300">I certify that I am the creator of this painting and have the right to upload and sell it.</span>
        </label>
      </div>
      {
        isLoading?(
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded-lg">Submiting</button>
        ):(
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded-lg">Submit</button>
        )
      }
    </form>
  );
  
  
};

export default PaintingForm;
