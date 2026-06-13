import React from 'react';

export default function StarRating({ rating, reviews }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className='star-rating'>
      {stars.map((star) => (
        <i
          key={star}
          className={
            rating >= star
              ? 'fas fa-star'
              : rating >= star - 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      ))}
      {typeof reviews === 'number' && (
        <span className='star-rating-count'>({reviews})</span>
      )}
    </div>
  );
}
