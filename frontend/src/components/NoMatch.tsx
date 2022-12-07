import React from "react";
import {Link} from "react-router-dom";
const NoMatch = () => {
  return (
    <div>
      <h2>Sorry that page does not exist.</h2>
      <p>
        <Link to="/">
          Please go to the home page to start saving the planet!
        </Link>
      </p>
    </div>
  );
};
export default NoMatch;
