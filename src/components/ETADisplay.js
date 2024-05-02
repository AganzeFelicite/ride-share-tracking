import React, { useEffect, useState } from "react";

const ETADisplay = ({ estimatedTime, nextStop }) => {
  const [placeName, setPlaceName] = useState("");

  console.log(nextStop.lat, nextStop.lng);
  useEffect(() => {
    const fetchPlaceName = async () => {
      const apiKey = ""; // Replace with your own API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${nextStop.lat},${nextStop.lng}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Response:", data);

        if (data.status === "OK" && data.results.length > 0) {
          setPlaceName(data.results[0].formatted_address);
        } else {
          throw new Error("Unable to fetch place name");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaceName();
  }, [nextStop]);

  const minutes = Math.floor(estimatedTime);
  const seconds = Math.round((estimatedTime - minutes) * 60);

  return (
    <div className="eta-display">
      <h1>Nyabugogo - Kimironko</h1>
      <p>{placeName}</p>
      <h2>Estimated Time to Next Stop</h2>
      <p>
        {minutes} minutes {seconds} seconds
      </p>
    </div>
  );
};

export default ETADisplay;
