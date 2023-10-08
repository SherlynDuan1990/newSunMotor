import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Assuming you have Redux to store user data
import axios from 'axios';
import { useAlert } from 'react-alert';

const apiUrl = process.env.REACT_APP_API_BASE_URL; 

const Account = () => {
    const user = useSelector((state) => state.auth);
    const initialState = {
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        bankAccount: user?.bankAccount || '',
        aboutUs: user?.aboutUs || '',
        position: user?.position || '', 
    };
    const [formData, setFormData] = useState(initialState);
  const alert = useAlert();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${apiUrl}/api/v1/me/update`, formData); // Update user profile data
      if (res.data.success) {
        alert.success('Profile updated successfully');
      }
    } catch (error) {
        alert.error('Profile update failed'); // Use alert.error to show error message
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    async function fetchUserData() {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/me`);
        if (res.data.success) {
          const userData = res.data.user;
          setFormData({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            bankAccount: userData.bankAccount,
            aboutUs: userData.aboutUs,
            position: userData.position,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []); // Empty dependency array to fetch data only once

  return (
    <div>
      <h1 className="sold-title">Update Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="sell-agreement">
          <div className="company">
            <h4 className="top">New Sun Used Cars Limited</h4>
            <div className="company-info">
              <div className="left">
                <div className="input-group">
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {/* You can add a password field here if you want to allow changing the password */}
              </div>
              <div className="right">
                <div className="input-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>Bank Account:</label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleChange}
                  />
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
                  <input
                    type="text"
                    name="name"
                    value={formData.name} // Assuming "name" field is staff name
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="right">
                <div className="input-group">
                  <label>Position:</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position} // Assuming "position" field is staff position
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="top">About Us</h4>
            <div className="input-group">
              <textarea
                name="aboutUs"
                value={formData.aboutUs}
                onChange={handleChange}
                style={{
                  border: '1px solid #4e7299',
                  width: '110%',
                  height: '40%',
                  minHeight: '100px',
                  paddingLeft: '20px',
                }}
              />
            </div>
          </div>
        </div>

        

        <div className="confirm-print">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default Account;
