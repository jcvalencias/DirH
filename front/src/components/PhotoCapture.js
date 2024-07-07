import React, { useState } from 'react';
import axios from 'axios';

const PhotoCapture = () => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('location', `${location.latitude},${location.longitude}`);
    formData.append('description', description);

    try {
      await axios.post('http://127.0.0.1:8000/api/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Photo uploaded successfully');
    } catch (error) {
      console.error('Error uploading photo', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Photo:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <button type="button" onClick={getLocation}>Get Location</button>
        {location.latitude && location.longitude && (
          <p>Location: {location.latitude}, {location.longitude}</p>
        )}
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default PhotoCapture;