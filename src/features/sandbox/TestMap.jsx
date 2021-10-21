import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function TestMap({ mapInput }) {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB2fuHlgZvnroO2VMern81krIwi2BP8R0Y" }}
        center={mapInput.center}
        zoom={mapInput.zoom}
      >
        <AnyReactComponent
          lat={mapInput.center.lat}
          lng={mapInput.center.lng}
          text='My Marker'
        />
      </GoogleMapReact>
    </div>
  );
}
