import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  Circle,
} from "@react-google-maps/api";
import ETADisplay from "./ETADisplay";
import carIcon from "../car.png";

const MapComponent = () => {
  const containerStyle = {
    width: "800px",
    height: "600px",
  };

  const center = {
    lat: -1.939826787816454,
    lng: 30.0445426438232,
  };

  const [driverLocation, setDriverLocation] = React.useState(center);
  const [estimatedTime, setEstimatedTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Simulate driver's movement along the route
      setDriverLocation((prevLocation) => ({
        lat: prevLocation.lat + 0.0001,
        lng: prevLocation.lng + 0.0001,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prevLocation) => ({
        lat: prevLocation.lat + 0.0001,
        lng: prevLocation.lng + 0.0001,
      }));

      const nextStop = findNextStop(driverLocation);
      if (nextStop) {
        const distance = getDistanceFromLatLonInKm(
          driverLocation.lat,
          driverLocation.lng,
          nextStop.lat,
          nextStop.lng
        );
        const averageSpeed = 50; // Assuming an average speed of 50 km/h
        const estimatedTimeInHours = distance / averageSpeed;
        setEstimatedTime(estimatedTimeInHours * 60); // Convert to minutes
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const findNextStop = (driverLocation) => {
    const stops = [
      center,
      { lat: -1.9355377074007851, lng: 30.060163829002217 },
      { lat: -1.9358808342336546, lng: 30.08024820994666 },
      { lat: -1.9489196023037583, lng: 30.092607828989397 },
      { lat: -1.9592132952818164, lng: 30.106684061788073 },
      { lat: -1.9487480402200394, lng: 30.126596781356923 },
      { lat: -1.9365670876910166, lng: 30.13020167024439 },
    ];

    let minDistance = Infinity;
    let nextStop = null;

    for (const stop of stops) {
      const distance = getDistanceFromLatLonInKm(
        driverLocation.lat,
        driverLocation.lng,
        stop.lat,
        stop.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        nextStop = stop;
      }
    }

    return nextStop;
  };

  return (
    <>
      <LoadScript googleMapsApiKey="">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          <Marker position={center} /> {/* Initial position marker */}
          <Marker
            position={driverLocation}
            icon={{
              url: carIcon,
              scaledSize: new window.google.maps.Size(40, 40), // Default car icon size
            }}
          />
          <Circle
            center={{ lat: -1.9355377074007851, lng: 30.060163829002217 }}
            radius={50}
            options={{ fillColor: "yellow", strokeColor: "yellow" }}
          />
          <Circle
            center={{ lat: -1.9358808342336546, lng: 30.08024820994666 }}
            radius={50}
            options={{ fillColor: "yellow", strokeColor: "yellow" }}
          />
          <Circle
            center={{ lat: -1.9489196023037583, lng: 30.092607828989397 }}
            radius={50}
            options={{ fillColor: "yellow", strokeColor: "yellow" }}
          />
          <Circle
            center={{ lat: -1.9592132952818164, lng: 30.106684061788073 }}
            radius={50}
            options={{ fillColor: "yellow", strokeColor: "yellow" }}
          />
          <Circle
            center={{ lat: -1.9487480402200394, lng: 30.126596781356923 }}
            radius={50}
            options={{ fillColor: "yellow", strokeColor: "yellow" }}
          />
          <Circle
            center={{ lat: -1.9365670876910166, lng: 30.13020167024439 }}
            radius={50}
            options={{ fillColor: "yellow", strokeColor: "yellow" }}
          />
          <Polyline
            path={[
              center,
              { lat: -1.9355377074007851, lng: 30.060163829002217 },
              { lat: -1.9358808342336546, lng: 30.08024820994666 },
              { lat: -1.9489196023037583, lng: 30.092607828989397 },
              { lat: -1.9592132952818164, lng: 30.106684061788073 },
              { lat: -1.9487480402200394, lng: 30.126596781356923 },
              { lat: -1.9365670876910166, lng: 30.13020167024439 },
            ]}
            options={{
              strokeColor: "black", // Change the polyline color to black
              strokeWeight: 10,
            }}
          />
        </GoogleMap>
      </LoadScript>
      <ETADisplay estimatedTime={estimatedTime} />
    </>
  );
};

export default MapComponent;
