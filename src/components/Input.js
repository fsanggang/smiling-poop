import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return(
      <div>
        <label htmlFor={this.props.for}>{this.props.label}</label>
        <input type="text" value={this.props.value} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default Input