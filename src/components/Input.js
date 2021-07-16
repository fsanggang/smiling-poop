import React from "react";

const Input = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  }

  return(
    <div>
      <label htmlFor={props.for}>{props.label}</label>
      <input type="text" value={props.value} onChange={handleChange}/>
    </div>
  )
}

export default Input