
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addNewCar , clearErrors } from '../../actions/carActions';
import { useNavigate } from 'react-router-dom';

const AddNewCar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate(); 
  const [imagePreview, setImagePreview] =useState('')
  const [carData, setCarData] = useState({
    title: '',
    price: '',
    year: '',
    kilometers: '',
    transmission: '',
    body: '',
    description: '',
    status: '',
    stockNo: '',
    vinNo: '',
    chassisNo: '',
    numberPlate: '',
    make: '',
    doors:'', 
    model: '',
    seats: '',
    color: '',
    fuelType: '',
    engineSize: '',
    wofExpire: '',
    regoExpire: '',
    numberOfOwners: '',
    cylinders:'',
    features: [],
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === 'file') {
      // Handle file input separately
      const selectedImages = Array.from(files);
  
      // Create an array to store the data URLs
      const imageDataURLs = [];
  
      // Use FileReader to read each selected image as a data URL
      selectedImages.forEach((image) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          // Add the data URL to the array
          imageDataURLs.push(event.target.result);
  
          // If all images have been read, update the carData state with the data URLs
          if (imageDataURLs.length === selectedImages.length) {
            setCarData({
              ...carData,
              images: [...imageDataURLs],
            });
            setImagePreview(reader.result)
          }
        };
  
        // Read the image as a data URL
        reader.readAsDataURL(image);

      });
    } else {
      setCarData({
        ...carData,
        [name]: value,
      });
    }
  };
  

  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    const updatedFeatures = [...carData.features];

    if (checked) {
      updatedFeatures.push(name);
    } else {
      const featureIndex = updatedFeatures.indexOf(name);
      if (featureIndex !== -1) {
        updatedFeatures.splice(featureIndex, 1);
      }
    }

    setCarData({
      ...carData,
      features: updatedFeatures,
    });
  };

  
  
  
  
  

  const handleAddCar = async () => {
    try {
      // Send a POST request to create a new car with carData
      await dispatch(addNewCar(carData));
      alert.success('Car added successfully');
      // Clear the input fields after adding the car
        // Clear the input fields after adding the car
        setCarData({
          title: '',
              price: '',
              year: '',
              kilometers: '',
              transmission: '',
              body: '',
              description: '',
              status: '',
              stockNo: '',
              vinNo: '',
              chassisNo: '',
              numberPlate: '',
              make: '',
              doors:'', 
              model: '',
              seats: '',
              color: '',
              fuelType: '',
              engineSize: '',
              wofExpire: '',
              regoExpire: '',
              numberOfOwners: '',
              cylinders:'',
              features: [],
              images: [],
        });
        navigate('/admin/stock');
         
    } catch (error) {
      console.error('Error adding car:', error);
      alert.error('An error occurred while adding the car');
    }
  };

  return (
    <div className="col-12 mt-5">
      <div className="row">
        <div className="col-6">
            <input
            style={{
                fontSize: '28px', // Set the font size to 22px
                color: '#438A38', // Set the text color to #438A38
                width: '100%',
                border:"none"
            }}
            type="text"
            name="title"
            placeholder="Title"
            value={carData.title}
            onChange={handleInputChange}
            />
        </div>
        <div className="col-6 text-right">
            <input
            style={{
                fontSize: '28px', // Set the font size to 22px
                color: '#438A38', // Set the text color to #438A38
                width: '100%',
                border:"none"
            }}
            type="text"
            name="price"
            placeholder="Price"
            value={carData.price}
            onChange={handleInputChange}
            />
        </div>
      </div>


      <hr />

      {/* Details section */}
      <div className="row">
        <div className="form-group col-6">
        <label htmlFor="body">stockNo:</label>
        <input
            type="number"
            name="stockNo"
            value={carData.stockNo}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        
      

        <label htmlFor="doors">Doors:</label>
         <input
            type="number"
            name="doors"
            value={carData.doors}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="transmission">Transmission:</label>
         <input
            type="text"
            name="transmission"
            value={carData.transmission}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="regoExpire">Rego Expire:</label>
         <input
            type="date"
            name="regoExpire"
            value={carData.regoExpire}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="kilometers">Kilometers:</label>
         <input
            type="number"
            name="kilometers"
            value={carData.kilometers}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="seats">Seats:</label>
         <input
            type="number"
            name="seats"
            value={carData.seats}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="make">Make:</label>
         <input
            type="text"
            name="make"
            value={carData.make}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />

          <label htmlFor="model">Model:</label>
         <input
            type="text"
            name="model"
            value={carData.model}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="body">Body:</label>
        <input
            type="text"
            name="body"
            value={carData.body}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        
      </div>
     
    
       
        <div className="form-group col-6 text-right">
        <label htmlFor="year"> Year:</label>
          <input
              type="number"
              name="year"
              value={carData.year}
              onChange={handleInputChange}
              style={{
                  margin: '5px',
                  borderColor: '#4E7299', 
                }}
          />
        <label htmlFor="vinNo"> vinNo:</label>
          <input
              type="text"
              name="vinNo"
              value={carData.vinNo}
              onChange={handleInputChange}
              style={{
                  margin: '5px',
                  borderColor: '#4E7299', 
                }}
          />
        
      
        <label htmlFor="wofExpire">wof Expire:</label>
         <input
            type="date"
            name="wofExpire"
            value={carData.wofExpire}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="fuelType">Fuel Type:</label>
         <input
            type="text"
            name="fuelType"
            value={carData.fuelType}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="engineSize">Engine Size:</label>
         <input
            type="text"
            name="engineSize"
            value={carData.engineSize}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="color">Color:</label>
         <input
            type="text"
            name="color"
            value={carData.color}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="numberOfOwners">Number Of Owners:</label>
        <input
            type="number"
            name="numberOfOwners"
            value={carData.numberOfOwners}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="cylinders">Cylinders:</label>
        <input
            type="number"
            name="cylinders"
            value={carData.cylinders}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />
        <label htmlFor="status">Status:</label>
        <input
            type="text"
            name="status"
            value={carData.status}
            onChange={handleInputChange}
            style={{
                margin: '5px',
                borderColor: '#4E7299', 
              }}
        />

        
        </div>
      </div>

      <hr />
      <div className="features">
        <h4>Features:</h4>
        <div className="row">
          {featureOptions.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <label style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                <input
                  type="checkbox"
                  name={feature}
                  checked={carData.features.includes(feature)}
                  onChange={handleFeatureChange}
                  style={{ marginRight: '5px' }}
                />
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>


      <hr />

      {/* Description section */}
      <h4>Description:</h4>
      <textarea
      className="mt-2"
      name="description"
      value={carData.description}
      onChange={handleInputChange}
      rows={4} 
      style={{
        width: '100%', 
      }}
    />




      <hr />

      <div >
     
      <h4 style={{ color:"#438A38", fontSize:"24px", marginRight: "5px"}}>Choose file to upload photos:</h4>
      <input
        type="file"
        name='images'
        id="imageInput"
        accept="image/*"
        multiple
        onChange={handleInputChange}
      />
      {carData.images.length > 0 && (
      <div>
        <h4 style={{ color: "#438A38", fontSize: "24px", marginRight: "5px" }}>
          Selected Images:
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {carData.images.map((image, index) => (
            <img
              key={index}
              src={imagePreview}
              alt={`Selected ${index + 1}`}
              style={{ maxWidth: "50%", maxHeight: "50px", margin: "5px" }}
            />
          ))}
        </div>
      </div>
    )}







    </div>

      <hr />

      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn status-btn mr-2"
          onClick={handleAddCar}
          style={{ backgroundColor: '#438A38', color: 'white' }}
        >
          Add Car
        </button>
        <button
          className="btn status-btn"
          type="reset"
          onClick={() => {
            // Function to reset the form data
            setCarData({
              title: '',
              price: '',
              year: '',
              kilometers: '',
              transmission: '',
              body: '',
              description: '',
              status: '',
              stockNo: '',
              vinNo: '',
              chassisNo: '',
              numberPlate: '',
              make: '',
              doors:'', 
              model: '',
              seats: '',
              color: '',
              fuelType: '',
              engineSize: '',
              wofExpire: '',
              regoExpire: '',
              numberOfOwners: '',
              cylinders:'',
              features: [],
              images: [],
            });
             
          }}
          style={{ backgroundColor: '#4E7299', color: 'white' }}
        >
          Reset
        </button>
      </div>

    </div>
  );
};

export default AddNewCar;

const featureOptions = [
  "ABS brakes",
  "Air conditioning",
  "Driver airbag",
  "Passenger airbag",
  "Alloy wheels",
  "CD Stacker",
  "Central locking",
  "Climate control",
  "Cruise Control",
  "Electric Mirrors",
  "Electric Windows",
  "Factory Alloys",
  "Fog lights",
  "Power Steering",
  "Rain sensing wipers",
  "Traction Control",
  "Smart key",
  "Reversing Camera",
  "Alarm",
  "VTNZ appraised",
  "Parking Sensors",
  "Exhaust Brakes",
  "Radio",
  "Remote Locking",
  "Spot Lights",
  "All Electrics",
  "Car Stereo",
];
