import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addContract } from '../actions/contractActions';
import { useAlert } from 'react-alert';

const SalesAgreement = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

    // Define a ref for the printable content
  const printableRef = useRef(null);

  // Define state for customer and contract data
  const [customerData, setCustomerData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    dateOfBirth: '',
    driverLicense: '',
  });

  const [contractData, setContractData] = useState({
    vinNumber: '',
    engineNumber: '',
    plateNumber: '',
    price: 0,
  });

  // Handle input changes for customer data
  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  // Handle input changes for contract data
  const handleContractInputChange = (e) => {
    const { name, value } = e.target;
    setContractData({ ...contractData, [name]: value });
  };

  // Handle the "Confirm and Print" button click
  const handleAddContract = () => {
    // Check if all required fields are filled
    if (
      customerData.fullName === '' ||
      customerData.emailAddress === '' ||
      customerData.phoneNumber === '' ||
      customerData.dateOfBirth === '' ||
      customerData.driverLicense === '' ||
      contractData.vinNumber === '' ||
      contractData.engineNumber === '' ||
      contractData.price === 0
    ) {
      alert.error('Please fill in all required fields.');
    } else {
      const dataToSubmit = {
        ...customerData,
        contract: {
          ...contractData,
          carDetails: {
            vinNumber: contractData.vinNumber,
            engineNumber: contractData.engineNumber,
            plateNumber: contractData.plateNumber,
            price: contractData.price,
          },
        },
      };
  
      // dispatch(addContract(dataToSubmit));
      // alert.success('Congratulations! You have successfully created a contract');
  
      // Clear the form fields after submission (optional)
      setCustomerData({
        fullName: '',
        emailAddress: '',
        phoneNumber: '',
        dateOfBirth: '',
        driverLicense: '',
      });
      setContractData({
        vinNumber: '',
        engineNumber: '',
        plateNumber: '',
        price: 0,
      });

      // Print the content
      window.print();
    }
  };
  

    
  return (
    
    <div >
    <div className="printable-content" ref={printableRef}>
    <h1 className="sold-title">Vehicle Sold Agreement</h1>
    <div className="sell-agreement">
        <div className="company">
            <h4 className="top">New Sun Used Cars Limited</h4>
            <div className="company-info">
            <div className="left">
                <p>
                <span className="sub-title">Phone:</span> 07 8467888<br />
                <span className="sub-title">Email:</span> henryaax@gmail.com<br />
                <span className="sub-title">Address:</span> 718b Te Rapa Rd, Te Rapa, Hamilton<br />
                <span className="sub-title">Bank Account:</span> 06-0229-0321064-00
                </p>
            </div>
            <div className="right">
                <p>
                <span className="sub-title">Trader No:</span> M-389-351<br />
                <span className="sub-title">Trading As:</span> New Sun Motor<br />
                <span className="sub-title">GST No:</span> 119510961<br />
                <span className="sub-title">Show Logo:</span> Yes
                </p>
            </div>
            </div>
        </div>
        <div className="car">
            <h4 className="top">Car Details</h4>
            <div className="car-details">
            <div className="left">
                <div className="input-group">
                <label>VIN Number * :</label>
                <input
                  type="text"
                  name="vinNumber"
                  value={contractData.vinNumber}
                  onChange={handleContractInputChange}
                  required
                />
                </div>
                <div className="input-group">
                <label>Plate Number:</label>
                <input
                  type="text"
                  name="plateNumber"
                  value={contractData.plateNumber}
                  onChange={handleContractInputChange}
                  
                />
                </div>
            </div>
            <div className="right">
                <div className="input-group">
                <label>Engine Number * :</label>
                <input
                  type="text"
                  name="engineNumber"
                  value={contractData.engineNumber}
                  onChange={handleContractInputChange}
                  required
                />
                </div>
                <div className="input-group">
                <label>Price * :</label>
                <input
                  type="number"
                  name="price"
                  value={contractData.price}
                  onChange={handleContractInputChange}
                  required
                />
                </div>
            </div>
            </div>
        </div>
        <div >
            <h4 className="top">Customer Details</h4>
            <div className="car-details">
            <div className="left">
                <div className="input-group">
                <label>Email Address * :</label>
                <input
                type="email"
                name="emailAddress"
                value={customerData.emailAddress}
                onChange={handleCustomerInputChange}
                required
              />
                </div>
                <div className="input-group">
                <label>Full Name * :</label>
                <input
                type="text"
                name="fullName"
                value={customerData.fullName}
                onChange={handleCustomerInputChange}
                required
              />
                </div>
                <div className="input-group">
                <label>Phone Number * :</label>
                <input
                type="text"
                name="phoneNumber"
                value={customerData.phoneNumber}
                onChange={handleCustomerInputChange}
                required
              />
                </div>

            </div>
            <div className="right">
                <div className="input-group">
                <label>Date of Birth * :</label>
                <input
                type="date"
                name="dateOfBirth"
                value={customerData.dateOfBirth}
                onChange={handleCustomerInputChange}
                required
              />
                </div>
                <div className="input-group">
                <label>Driver License * :</label>
                <input
                type="text"
                name="driverLicense"
                value={customerData.driverLicense}
                onChange={handleCustomerInputChange}
                required
              />

                </div>
            </div>
            </div>
        </div>
        </div>
        </div>

    
       
 
      
      
      <div className="confirm-print">
        <button onClick={handleAddContract}>Confirm and Print</button>
      </div>
    </div>

  );
};

export default SalesAgreement;
