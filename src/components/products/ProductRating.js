import React from "react";

const ProductRating = ({ rating, size }) => {
  size = size.toLowerCase();
  if (
    size != "is-small" &&
    size != "is-medium" &&
    size != "is-large" &&
    size != ""
  ) {
    console.error(
      "Invalid argument! The 'size' argument must be one of the following: is-small, is-medium, is-large"
    );
  }
  return (
    <>
      <i
        className={`nes-icon ${size} heart ${
          rating > 0.49 ? (rating >= 1 ? "" : "is-half") : "is-transparent"
        }`}
      ></i>
      <i
        className={`nes-icon ${size} heart ${
          rating > 1.49 ? (rating >= 2 ? "" : "is-half") : "is-transparent"
        }`}
      ></i>
      <i
        className={`nes-icon ${size} heart ${
          rating > 2.49 ? (rating >= 3 ? "" : "is-half") : "is-transparent"
        }`}
      ></i>
      <i
        className={`nes-icon ${size} heart ${
          rating > 3.49 ? (rating >= 4 ? "" : "is-half") : "is-transparent"
        }`}
      ></i>
      <i
        className={`nes-icon ${size} heart ${
          rating > 4.49 ? (rating >= 5 ? "" : "is-half") : "is-transparent"
        }`}
      ></i>
    </>
  );
};

export default ProductRating;
