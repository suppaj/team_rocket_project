import React from "react";

const TypeMapper = ({ typeArray, setFilterMessage, typeFilter }) => {
  // if the two callback functions are passed in, the type badges are rendered as buttons that will set the filter
  if (setFilterMessage && typeFilter) {
    return typeArray.map((type, index) => {
      return (
        <span
          className={`${type} nes-container is-rounded nes-pointer`}
          style={{
            marginRight: "10px",
            marginLeft: "10px",
            padding: "2px",
          }}
          key={index}
          onClick={() => {
            setFilterMessage(`${type}`);
            typeFilter(type);
          }}
        >
          {type}
        </span>
      );
    });
    // otherwise the type badges will be rendered without the 'nes-pointer' class and not onClick handler
  } else {
    return typeArray.map((type, index) => {
      return (
        <span
          className={`${type} nes-container is-rounded`}
          style={{
            marginRight: "10px",
            marginLeft: "10px",
            padding: "2px",
          }}
          key={index}
        >
          {type}
        </span>
      );
    });
  }
};

export default TypeMapper;
