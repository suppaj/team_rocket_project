import React, { useEffect, useState } from "react";

const ProductReviews = () => {
  const test_reviews = [
    {
      rating: 5,
      review_title: "I love Team Rocket",
      review_comment: "I love this pokemon Team Rocket stole for me!",
      display_name: "teamrocketgrunt420",
    },
    {
      rating: 1,
      review_title: "Questionably Sourced",
      review_comment:
        "I think team rocket stole this pokemon from my 5 year old neigbor...",
      display_name: "marnielover69",
    },
    {
      rating: 3,
      review_title: "Team Rocket blasting off again!",
      review_comment:
        "I think that this company is despicable, but their service is top notch. I'm very conflicted...",
      display_name: "missingno",
    },
  ];

  function reviewMapper(reviewArray) {
    return reviewArray.map(
      ({ review_title, review_comment, rating, display_name }) => {
        return (
          <section className="message -left">
            <div className="nes-balloon from-left">
              <div className="review-title">
                <div className="customer-rating" style={{ float: "right" }}>
                  {ratingGenerator(rating)}
                </div>
                <p>{review_title}</p>
                <br />
              </div>
              <p className="review-comment">{review_comment}</p>
              <br />
              <p className="review-name">{display_name}</p>
            </div>
          </section>
        );
      }
    );
  }

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

  return (
    <section
      style={{ gridRow: "3/4", gridColumn: "2/4", marginTop: "10px" }}
      className="nes-container is-rounded"
    >
      <h4 style={{ textAlign: "center" }}>Customer Reviews</h4>
      <div className="reviews">
        <section className="message-list">{reviewMapper(test_reviews)}</section>
      </div>
    </section>
  );
};

export default ProductReviews;
