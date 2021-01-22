import React, { useState } from "react";

import { submitCustomerReview } from "../../api";

const ReviewStars = ({ reviewInfo, setReviewInfo }) => {
  return (
    <div className="customer-rating">
      <label>Rating</label>
      <div className="review-stars" style={{ marginTop: "-5px" }}>
        <i
          onClick={() => {
            setReviewInfo({ ...reviewInfo, rating: 1 });
          }}
          className={`nes-icon is-medium heart ${
            reviewInfo.rating > 0 ? "" : "is-transparent"
          }`}
        ></i>
        <i
          onClick={() => {
            setReviewInfo({ ...reviewInfo, rating: 2 });
          }}
          className={`nes-icon is-medium heart ${
            reviewInfo.rating > 1 ? "" : "is-transparent"
          }`}
        ></i>
        <i
          onClick={() => {
            setReviewInfo({ ...reviewInfo, rating: 3 });
          }}
          className={`nes-icon is-medium heart ${
            reviewInfo.rating > 2 ? "" : "is-transparent"
          }`}
        ></i>
        <i
          onClick={() => {
            setReviewInfo({ ...reviewInfo, rating: 4 });
          }}
          className={`nes-icon is-medium heart ${
            reviewInfo.rating > 3 ? "" : "is-transparent"
          }`}
        ></i>
        <i
          onClick={() => {
            setReviewInfo({ ...reviewInfo, rating: 5 });
          }}
          className={`nes-icon is-medium heart ${
            reviewInfo.rating > 4 ? "" : "is-transparent"
          }`}
        ></i>{" "}
      </div>
    </div>
  );
};

const ReviewForm = ({ product_id }) => {
  const [reviewInfo, setReviewInfo] = useState({
    review_id: "current",
    prod_id: parseInt(product_id),
    rating: 0,
    review_title: "",
    review_comment: "",
    cust_id: 2,
  });

  function resetForm() {
    setReviewInfo({
      review_id: "current",
      prod_id: parseInt(product_id),
      rating: 0,
      review_title: "",
      review_comment: "",
      cust_id: 2,
    });
  }

  return (
    <>
      <h4 style={{ textAlign: "center" }}>Leave a review!</h4>
      <ReviewStars reviewInfo={reviewInfo} setReviewInfo={setReviewInfo} />
      <div className="title-input nes-field">
        <label htmlFor="title_field">Headline</label>
        <input
          type="text"
          id="title_field"
          className="nes-textarea"
          placeholder="What's most important to know?"
          value={reviewInfo.review_title}
          onChange={(event) => {
            setReviewInfo({
              ...reviewInfo,
              review_title: event.target.value,
            });
          }}
        />
      </div>
      <div className="description-input" style={{ marginTop: "15px" }}>
        <label htmlFor="textarea_field">Add a written review</label>
        <textarea
          style={{ height: "6rem" }}
          id="textarea_field"
          className="nes-textarea"
          placeholder="What did you like or dislike?"
          value={reviewInfo.review_comment}
          onChange={(event) => {
            setReviewInfo({
              ...reviewInfo,
              review_comment: event.target.value,
            });
          }}
        ></textarea>
      </div>
      <button
        type="button"
        id="review_submit-btn"
        className={`nes-btn is-success ${
          reviewInfo.rating != 0
            ? reviewInfo.review_title != 0
              ? reviewInfo.review_comment != 0
                ? ""
                : "is-disabled"
              : "is-disabled"
            : "is-disabled"
        }`}
        onClick={async (event) => {
          event.preventDefault();
          console.log("review object:", reviewInfo);
          const review = await submitCustomerReview(reviewInfo);
          console.log("submit response:", review);
          resetForm();
        }}
        // conditionally disables the button
        disabled={
          reviewInfo.rating != 0
            ? reviewInfo.review_title != 0
              ? reviewInfo.review_comment != 0
                ? 0
                : 1
              : 1
            : 1
        }
      >
        Submit
      </button>
    </>
  );
};

export default ReviewForm;
