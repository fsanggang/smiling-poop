import React from "react";


import Input from "./Input";

class Converter extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmojiToIpv4 = this.handleEmojiToIpv4.bind(this);
    this.handleIpv4ToEmoji = this.handleIpv4ToEmoji.bind(this);
    this.convertEmojiToIpv4 = this.convertEmojiToIpv4.bind(this);
    this.convertIpv4ToEmoji = this.convertIpv4ToEmoji.bind(this);

    this.state = {value: "💩", from: "emoji", to: "ipv4"}
  }

  handleEmojiToIpv4(value) {
    this.setState({value: value, from: "emoji", to: "ipv4"});
  }

  handleIpv4ToEmoji(value) {
    this.setState({value: value, from: "ipv4", to: "emoji"});
  }

  convertEmojiToIpv4() {
    let encoded = encodeURIComponent(this.state.value);
    let hexArray = encoded.split("%").filter(e => e);
    let decArray = [];

    for (let hex of hexArray) {
      let dec = parseInt(hex, 16);
      decArray.push(dec);
    }

    return decArray.join(".");
  }

  convertIpv4ToEmoji() {
    let ipv4 = this.state.value;
    let decArray = ipv4.split(".").filter(e => e).map(e => parseInt(e));

    if (decArray.length < 3) return "";
    if (decArray[0] === 0) decArray.shift(); // ignore 0 at 1st position
    if (decArray[decArray.length - 1] === 0) decArray.pop(); // ignore 0 at 4th position

    let encoded = "";

    for (let dec of decArray) {
      encoded += "%" + (dec).toString(16).toUpperCase();
    }

    let emoji = "";

    try {
      emoji = decodeURIComponent(encoded);
    } catch(error) {
      // swallow this error
    }

    return emoji;
  }

  render() {
    const value = this.state.value;
    const from = this.state.from;
    const to = this.state.to;

    const emoji = from === "ipv4" && to === "emoji" ? this.convertIpv4ToEmoji() : value;
    const ipv4 = from === "emoji" && to === "ipv4" ? this.convertEmojiToIpv4() : value;

    return (
      <form>
        <Input value={emoji} htmlFor="emoji" label="from emoji to ipv4" onChange={this.handleEmojiToIpv4} />
        <Input value={ipv4} htmlFor="ipv4" label="from ipv4 to emoji" onChange={this.handleIpv4ToEmoji} />
      </form>
    )
  }
}

export default Converter