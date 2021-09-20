import React from "react";
import "./Button.css";

const Button = ({title, variant, onClick}) => {
  return (
    <>
      <button onClick={onClick} className={variant}>{title}</button>
    </>
  );
};

export default Button;
