import React from "react";

const ETADisplay = ({ estimatedTime }) => {
  const minutes = Math.floor(estimatedTime);
  const seconds = Math.round((estimatedTime - minutes) * 60);

  return (
    <div className="eta-display">
      <h2>Estimated Time to Next Stop</h2>
      <p>
        {minutes} minutes {seconds} seconds
      </p>
    </div>
  );
};

export default ETADisplay;
