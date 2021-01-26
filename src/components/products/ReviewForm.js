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

const ReviewForm = ({
  product_id,
  user,
  currentReviews,
  setCurrentReviews,
}) => {
  const [reviewInfo, setReviewInfo] = useState({
    review_id: "current",
    prod_id: parseInt(product_id),
    rating: 0,
    review_title: "",
    review_comment: "",
    cust_id: 0,
    first_name: "",
  });

  function resetForm() {
    setReviewInfo({
      review_id: "current",
      prod_id: parseInt(product_id),
      rating: 0,
      review_title: "",
      review_comment: "",
      cust_id: 0,
      first_name: "",
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
              cust_id: user.custID,
              first_name: user.firstName,
            });
          }}
        ></textarea>
      </div>
      <button
        type="button"
        id="review_submit-btn"
        className={`nes-btn ${
          reviewInfo.rating !== 0
            ? reviewInfo.review_title !== 0
              ? reviewInfo.review_comment !== 0
                ? "is-success"
                : "is-disabled"
              : "is-disabled"
            : "is-disabled"
        }`}
        onClick={async (event) => {
          event.preventDefault();
          const newReview = await submitCustomerReview(reviewInfo);
          newReview.first_name = user.firstName;
          let copy = [...currentReviews];
          copy.push(newReview);
          setCurrentReviews(copy);
          resetForm();
        }}
        // conditionally disables the button
        disabled={
          reviewInfo.rating !== 0
            ? reviewInfo.review_title !== 0
              ? reviewInfo.review_comment !== 0
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
