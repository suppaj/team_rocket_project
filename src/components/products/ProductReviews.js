import React, { useEffect, useState } from "react";

import ReviewForm from "./ReviewForm";
import ProductRating from "./ProductRating";

const ProductReviews = ({ reviews, product_id, isLoggedIn, user }) => {
  const [currentReviews, setCurrentReviews] = useState([]);

  useEffect(() => {
    setCurrentReviews(reviews);
  }, []);

  function overallRating(reviewArray) {
    if (reviewArray.length > 0) {
      let totalRating = 0;
      let ratingsCount = reviewArray.length;
      reviewArray.forEach((element) => {
        totalRating = totalRating + parseInt(element.rating);
      });
      let averageRating = parseFloat(totalRating / ratingsCount);
      return averageRating;
    }
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
                className={`review-balloon nes-balloon from${
                  index % 2 === 0 ? "-left" : "-right"
                }`}
              >
                <div className="review-title">
                  <div className="individual-customer-rating">
                    <ProductRating rating={parseFloat(rating)} size={""} />
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
        <div className="no-reviews nes-container is-dark with-title">
          <p className="title">Whoops!</p>
          <p>
            There don't seem to be any reviews for this product...
            {isLoggedIn ? "Be" : "Login or register and be"} the first to leave
            a review!
          </p>
          <hr />
        </div>
      );
    }
  }

  return (
    <section className="nes-container customer-reviews-container">
      <div className="customer-reviews-header">
        <h4>Customer Reviews</h4>
        {reviews.length > 0 ? (
          <ProductRating
            rating={overallRating(currentReviews)}
            size={"is-medium"}
          />
        ) : (
          ""
        )}
      </div>
      <div className="reviews">
        <section className="message-list">
          {reviewMapper(currentReviews)}
        </section>
      </div>
      <hr />
      {isLoggedIn ? (
        <ReviewForm
          product_id={product_id}
          user={user}
          currentReviews={currentReviews}
          setCurrentReviews={setCurrentReviews}
        />
      ) : (
        ""
      )}
      {isLoggedIn !== true && currentReviews.length > 0 ? (
        <p className="reviews-logged-out">Log in to leave a review!</p>
      ) : (
        ""
      )}
    </section>
  );
};

export default ProductReviews;
