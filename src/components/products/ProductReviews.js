import React from "react";

const ProductReviews = ({ reviews }) => {
  const test_reviews = [
    {
      review_id: 1,
      rating: 5,
      review_title: "I love Team Rocket",
      review_comment: "I love this pokemon Team Rocket stole for me!",
      first_name: "Kyle",
    },
    {
      review_id: 2,
      rating: 1,
      review_title: "Questionably Sourced",
      review_comment:
        "I think Team Rocket stole this pokemon from my 5 year old neigbor...",
      first_name: "Tiffany",
    },
    {
      review_id: 3,
      rating: 3,
      review_title: "Team Rocket blasting off again!",
      review_comment:
        "I think this company is absolutely despicable, but their service is top notch. I'm very conflicted...",
      first_name: "Josh",
    },
  ];

  const test_reviews2 = [];

  function reviewMapper(reviewArray) {
    if (reviewArray.length > 0) {
      return reviewArray.map(
        ({ review_id, review_title, review_comment, rating, first_name }) => {
          return (
            <section className="message -left" key={review_id}>
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
        </div>
      );
    }
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
      style={{ gridRow: "3/4", gridColumn: "2/4", marginTop: "30px" }}
      className="nes-container is-rounded"
    >
      <h4 style={{ textAlign: "center" }}>Customer Reviews</h4>
      <div className="reviews">
        <section className="message-list">{reviewMapper(reviews)}</section>
      </div>
    </section>
  );
};

export default ProductReviews;
