import React from "react";
import { Link } from "react-router-dom";

export const SearchBtn = () => {
  return (
    <div className="open-search">
      <Link to="/search"></Link>
    </div>
  );
};
