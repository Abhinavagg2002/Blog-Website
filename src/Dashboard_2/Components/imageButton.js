import React, { useState } from 'react';
import './ImageUploadButton.css'; // Import the CSS file for styling

const ImageUploadButton = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="image-upload-input"
      />
      <label htmlFor="image-upload-input" className="upload-button">
        Upload Image
      </label>

      {selectedImage && (
        <div className="preview-container">
          <img src={selectedImage} alt="Uploaded" className="preview-image" />
        </div>
      )}
    </div>
  );
};

export default ImageUploadButton;
