import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";

class EmojiConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      bytes: Array(4).fill(0),
      http4: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getBytes() {
    let encoded = encodeURIComponent(this.state.value);
    let hexArray = encoded.split("%").filter(e => e);
    let decArray = [];

    for (let hex of hexArray) {
      let dec = parseInt(hex, 16);
      decArray.push(dec);
    }

    // debugger

    // this.setState({ bytes: decArray });

    return decArray;
  }

  formatHttp4(bytes) {
    let http4 = bytes.join(".");

    // debugger

    // this.setState({ http4: http4 });

    return http4;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let bytes = this.getBytes();
    let http4 = this.formatHttp4(bytes);

    this.setState({ bytes: bytes, http4: http4 });
  }

  render() {
    let http4 = this.state.http4;

    return(
      <div>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="emoji">Emoji:</label>
        <input type="text" id="emoji" name="emoji" size="10" onChange={this.handleChange}/>
        <input type="submit" value="submit" />
      </form>

      <p>{http4}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <EmojiConverter />,
  document.getElementById("root")
);

