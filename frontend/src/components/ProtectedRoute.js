import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ loggedIn, children, path }) {
  return (
    <Route>
      { loggedIn ? children : <Redirect to={path} /> }
    </Route>
  );
};

export default ProtectedRoute;
