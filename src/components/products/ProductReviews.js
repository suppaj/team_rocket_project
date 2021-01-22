import React from "react";

import ReviewForm from "./ReviewForm";

const ProductReviews = ({ reviews, product_id }) => {
  function ratingGenerator(rating) {
    return (
      <>
        <i
          className={`nes-icon is-small heart ${
            rating > 0 ? "" : "is-transparent"
          }`}
        ></i>
        <i
          className={`nes-icon is-small heart ${
            rating > 1 ? "" : "is-transparent"
          }`}
        ></i>
        <i
          className={`nes-icon is-small heart ${
            rating > 2 ? "" : "is-transparent"
          }`}
        ></i>
        <i
          className={`nes-icon is-small heart ${
            rating > 3 ? "" : "is-transparent"
          }`}
        ></i>
        <i
          className={`nes-icon is-small heart ${
            rating > 4 ? "" : "is-transparent"
          }`}
        ></i>
      </>
    );
  }

  function reviewMapper(reviewArray) {
    if (reviewArray.length > 0) {
      return reviewArray.map(
        (
          { review_id, review_title, review_comment, rating, first_name },
          index
        ) => {
          return (
            <section className="message" key={review_id}>
              <div
                className={`nes-balloon from${
                  index % 2 === 0 ? "-left" : "-right"
                }`}
              >
                <div className="review-title">
                  <div className="customer-rating" style={{ float: "right" }}>
                    {ratingGenerator(rating)}
                  </div>
                  <p>{review_title}</p>
                  <br />
                </div>
                <p className="review-comment">{review_comment}</p>
                <br />
                <p className="review-name">{first_name}</p>
              </div>
            </section>
          );
        }
      );
    } else {
      return (
        <div
          className="no-reviews nes-container is-dark with-title"
          style={{ marginTop: "25px" }}
        >
          <p class="title">Whoops!</p>
          <p>
            There don't seem to be any reviews for this product... Be the first
            to leave a review!
          </p>
          <hr />
        </div>
      );
    }
  }

  return (
    <section
      style={{ gridRow: "3/4", gridColumn: "2/4", marginTop: "30px" }}
      className="nes-container"
    >
      <h4 style={{ textAlign: "center" }}>Customer Reviews</h4>
      <div className="reviews">
        <section className="message-list">{reviewMapper(reviews)}</section>
      </div>
      <hr />
      <ReviewForm product_id={product_id} />
    </section>
  );
};

export default ProductReviews;
