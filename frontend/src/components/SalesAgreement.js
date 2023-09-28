import React from 'react';

const SalesAgreement = () => {
  return (
    <div>
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
                <label>VIN Number:</label>
                <input type="text" name="vinNumber" />
                </div>
                <div className="input-group">
                <label>Plate Number:</label>
                <input type="text" name="plateNumber" />
                </div>
            </div>
            <div className="right">
                <div className="input-group">
                <label>Engine Number:</label>
                <input type="text" name="engineNumber" />
                </div>
                <div className="input-group">
                <label>Price:</label>
                <input type="number" name="price" />
                </div>
            </div>
            </div>
        </div>
        <div >
            <h4 className="top">Customer Details</h4>
            <div className="car-details">
            <div className="left">
                <div className="input-group">
                <label>Email Address:</label>
                <input type="email" name="emailAddress" />
                </div>
                <div className="input-group">
                <label>Full Name:</label>
                <input type="text" name="fullName" />
                </div>
                <div className="input-group">
                <label>Phone Number:</label>
                <input type="text" name="phoneNumber" />
                </div>

            </div>
            <div className="right">
                <div className="input-group">
                <label>Date of Birth:</label>
                <input type="date" name="dateOfBirth" />
                </div>
                <div className="input-group">
                <label>Driver License:</label>
                <input type="text" name="driverLicense" />
                </div>
            </div>
            </div>
        </div>
        </div>

    
       
 
      
      
      <div className="confirm-print">
        <button>Confirm and Print</button>
      </div>
    </div>

  );
};

export default SalesAgreement;
