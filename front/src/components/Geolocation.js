import React, { useState } from 'react';

const GeoLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

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

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
      {location.latitude && location.longitude && (
        <div>
          <h3>Your Location</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeoLocation;