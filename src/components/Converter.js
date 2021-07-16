import React, { useState, setState } from "react";

import Input from "./Input";

const Converter = (props) => {
  const [value, setValue] = useState("💩");
  const [from, setFrom] = useState("emoji");

  const handleEmojiToIpv4 = (value) => {
    setValue(value);
    setFrom("emoji");
  }

  const handleIpv4ToEmoji = (value) => {
    setValue(value);
    setFrom("ipv4");
  }

  const convertEmojiToIpv4 = () => {
    let encoded = encodeURIComponent(value);
    let hexArray = encoded.split("%").filter(e => e);
    let decArray = [];

    for (let hex of hexArray) {
      let dec = parseInt(hex, 16);
      decArray.push(dec);
    }

    return decArray.join(".");
  }

  const convertIpv4ToEmoji = () => {
    let ipv4 = value;
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

  return (
    <form>
      <Input value={from === "ipv4" ? convertIpv4ToEmoji() : value} htmlFor="emoji" label="from emoji to ipv4" onChange={handleEmojiToIpv4} />
      <Input value={from === "emoji" ? convertEmojiToIpv4() : value} htmlFor="ipv4" label="from ipv4 to emoji" onChange={handleIpv4ToEmoji} />
    </form>
  )
}

export default Converter