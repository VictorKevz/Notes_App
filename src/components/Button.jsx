import React, { useContext } from "react";
import { DataContext } from "../App";

function Button({ data }) {
    const{notes} = useContext(DataContext)
  return (
    <button className="reusable-btn">
      <data.icon/> {data.text}
    </button>
  );
}

export default Button;
