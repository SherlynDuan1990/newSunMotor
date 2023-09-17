import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarDetails, updateCar, clearErrors } from '../../actions/carActions';

const UpdateCar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, car } = useSelector(state => state.carDetails);
  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getCarDetails(id));
  }, [dispatch, alert, error, id]);


  useEffect(() => {
    // Populate carData when car details are available
    if (car) {
      setCarData({
        features: car.features || [],
        title: car.title || '',
        price: car.price || '',
        year: car.year || '',
        kilometers: car.kilometers || '',
        transmission: car.transmission || '',
        body: car.body || '',
        description: car.description || '',
        status: car.status || '',
        stockNo: car.stockNo || '',
        vinNo: car.vinNo || '',
        chassisNo: car.chassisNo || '',
        numberPlate: car.numberPlate || '',
        make: car.make || '',
        doors: car.doors || '',
        model: car.model || '',
        seats: car.seats || '',
        color: car.color || '',
        fuelType: car.fuelType || '',
        engineSize: car.engineSize || '',
        wofExpire: car.wofExpire || '',
        regoExpire: car.regoExpire || '',
        numberOfOwners: car.numberOfOwners || '',
        cylinders: car.cylinders || '',
        images: car.images || [],
      });
      
      setIsLoading(false); // Set loading to false when car data is available
    }
  }, [car]);

  function formatDateToString(dateString) {
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (!isNaN(date)) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();
  
      return `${year}-${month}-${day}`;
    } else {
      console.error("Invalid date format");
      return null; // You can return null or handle the error differently if needed
    }
  }
 
  
  // Example usage:
  const formattedRegoExpire = formatDateToString(car.regoExpire);
  const formattedWofExpire = formatDateToString(car.wofExpire);
  
  if (formattedRegoExpire !== null) {
    car.regoExpire = formattedRegoExpire;
  }
  
  if (formattedWofExpire !== null) {
    car.wofExpire = formattedWofExpire;
  }
  

  
  

  

  const [carData, setCarData] = useState({
    features: car.features || [],
    title: car.title || '',
    price: car.price || '',
    year: car.year || '',
    kilometers: car.kilometers || '',
    transmission: car.transmission || '',
    body: car.body || '',
    description: car.description || '',
    status: car.status || '',
    stockNo: car.stockNo || '',
    vinNo: car.vinNo || '',
    chassisNo: car.chassisNo || '',
    numberPlate: car.numberPlate || '',
    make: car.make || '',
    doors: car.doors || '',
    model: car.model || '',
    seats: car.seats || '',
    color: car.color || '',
    fuelType: car.fuelType || '',
    engineSize: car.engineSize || '',
    wofExpire: car.wofExpire || '',
    regoExpire: car.regoExpire || '',
    numberOfOwners: car.numberOfOwners || '',
    cylinders: car.cylinders || '',
    images: car.images || [],
    
  });
  

  // Separate state for image preview
  const [imagePreview, setImagePreview] = useState('');

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
            setImagePreview(reader.result);
          }
        };
  
        // Read the image as a data URL
        reader.readAsDataURL(image);
      });
    } else if (name === 'regoExpire' || name === 'wofExpire') {
      // Handle date inputs separately and parse them into "yyyy-MM-dd" format
      const dateValue = new Date(value);
  
      if (!isNaN(dateValue)) {
        const formattedDate = formatDateToString(dateValue);
        setCarData({
          ...carData,
          [name]: formattedDate,
        });
      } else {
        console.error(`Invalid date format for ${name}`);
      }
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

  
  
  
  
  

  const handleUpdateCar = async () => {
    try {
      // Convert regoExpire and wofExpire back to Date objects
      const regoExpireDate = new Date(carData.regoExpire);
      const wofExpireDate = new Date(carData.wofExpire);

      if (!isNaN(regoExpireDate) && !isNaN(wofExpireDate)) {
        // Format the Date objects as strings
        carData.regoExpire = regoExpireDate.toISOString();
        carData.wofExpire = wofExpireDate.toISOString();
        
        // Send a POST request to update the car with carData
        await dispatch(updateCar(carData, id));
        alert.success('Car updated successfully');
        
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
         
    } else {
      console.error('Invalid date format for regoExpire or wofExpire');
      alert.error('Invalid date format. Please enter dates in "yyyy-MM-dd" format.');
    }
  } catch (error) {
    console.error('Error updating car:', error);
    alert.error('An error occurred while updating the car');
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
              src={image.url}
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
          onClick={handleUpdateCar}
          style={{ backgroundColor: '#438A38', color: 'white' }}
        >
          Update Car
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

export default UpdateCar;

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
