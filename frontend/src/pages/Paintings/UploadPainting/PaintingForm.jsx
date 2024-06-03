import React, { useState } from 'react';

const PaintingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    medium: '',
    dimensions: '',
    yearCreated: '',
    price: '',
    image: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-center mb-4">Fill Form</h1>
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold mb-2 text-sm md:text-md ">Name:</label>
        <input type="text" id="name" name="name" placeholder="e.g Vaibhav Ambhore" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-sm md:text-md" />
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
        <input type="text" id="dimensions" name="dimensions" placeholder="e.g 22X23 cm" value={formData.dimensions} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 text-sm md:text-md" />
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
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded-lg">Submit</button>
    </form>
  );
  
  
};

export default PaintingForm;
