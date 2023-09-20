import React from 'react'

const Account = () => {
    return (
        <div>
        <h1 className="sold-title">Update Account</h1>
        <div className="sell-agreement">
            <div className="company">
                <h4 className="top">New Sun Used Cars Limited</h4>
                <div className="company-info">
                <div className="left">
                    <div className="input-group">
                    <label>Phone:</label>
                    <input type="text" name="phone" />
                    </div>
                    <div className="input-group">
                    <label>Email:</label>
                    <input type="text" name="email" />
                    </div>
                    
                </div>
                <div className="right">
                    <div className="input-group">
                    <label>Address:</label>
                    <input type="text" name="address" />
                    
                    </div>
                    
                    <div className="input-group">
                    <label>Bank Account:</label>
                    <input type="text" name="bankAccount" />
                    </div>
                </div>
                </div>
            </div>
            <div className="car">
                <h4 className="top">Staff</h4>
                <div className="car-details">
                <div className="left">
                    <div className="input-group">
                    <label>Name:</label>
                    <input type="text" name="staffName" />
                    </div>
                    <div className="input-group">
                    <label>Phone Number:</label>
                    <input type="text" name="staffNumber" />
                    </div>
                </div>
                <div className="right">
                    <div className="input-group">
                    <label>Postion:</label>
                    <input type="text" name="staffPosition" />
                    </div>
                    <div className="input-group">
                    <label>Email:</label>
                    <input type="text" name="staffEmail" />
                    </div>
                </div>
                </div>
            </div>
            <div >
                <h4 className="top">About Us</h4>
                
                <div className="input-group">
                    <textarea  
                    name="aboutUs" 
                    style={{ border: "1px solid #4e7299", width: '110%', height: '40%', minHeight: '100px' , paddingLeft: '20px'}}/>
                    </div>
                </div>
            
            </div>
    
        
           
     
          
          
          <div className="confirm-print">
            <button>Confirm and Print</button>
          </div>
        </div>
    
    );
};

export default Account