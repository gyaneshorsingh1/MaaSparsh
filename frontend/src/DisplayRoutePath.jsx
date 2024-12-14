import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DisplayRoute.css";

const DisplayRoutePath = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Split the path into segments for clickable links
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Handle navigation on click
  const handleNavigation = (index) => {
    const newPath = '/' + pathSegments.slice(0, index + 1).join('/');
    navigate(newPath);
  };

  // Function to check if a segment contains a number
  const containsNumber = (segment) => /\d/.test(segment);

  // Determine if any part of the route contains a number
  const hasNumberInRoute = pathSegments.some(containsNumber);

  // If the route contains a number, don't render the component
  if (hasNumberInRoute) {
    return null;
  }

  return (
    <div>
      <p id="route-path">
        {/* Render Home link */}
        <span className="route-path" onClick={() => navigate('/')}>
          home
        </span>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            {' > '}
            <span
              className="route-path"
              style={{ cursor: 'pointer' }}
              onClick={() => handleNavigation(index)}
            >
              {segment}
            </span>
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default DisplayRoutePath;
