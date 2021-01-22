import React, { useEffect, useState } from "react";

const ReviewForm = () => {
  const [reviewInfo, setReviewInfo] = useState({
    prod_id: "",
    rating: "",
    review_title: "",
    review_comment: "",
    cust_id: 2,
  });

  return <p>Review Form Placeholder</p>;
};

export default ReviewForm;
