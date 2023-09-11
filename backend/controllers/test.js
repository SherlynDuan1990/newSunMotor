const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2; // Make sure to import the Cloudinary library

router.get('/test-cloudinary', async (req, res) => {
  try {
    // Configure Cloudinary (You might already have this in your application)
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Upload a test image to Cloudinary
    const result = await cloudinary.uploader.upload('https://media.istockphoto.com/id/1403278751/photo/abstract-particle-background.webp?b=1&s=170667a&w=0&k=20&c=BdJSofDWBiySpZe_-SgecLnt9MB5ZBp1FtCIGaNASB8=', {
      folder: 'newSunMotor', // Optional: Set a folder to organize test images
    });

    // Check if the image was uploaded successfully
    if (result.secure_url) {
      return res.status(200).json({ message: 'Cloudinary uploader is working!' });
    } else {
      return res.status(500).json({ message: 'Cloudinary upload failed!' });
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({ message: 'Cloudinary upload failed!' });
  }
});

module.exports = router;
