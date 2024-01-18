// UserCard.js
import React from 'react';
import './UserCard.css'; // You can create this file for styling

const UserCard = ({ user }) => {
  const { name, userId, email, phoneNumber, imageUrl } = user;

  return (
    <div className="user-card">
      <img src={imageUrl} alt={name} className="user-image" />
      <div className="user-details">
        <h2>{name}</h2>
        <p>User ID: {userId}</p>
        <p>Email: {email}</p>
        <p>Phone: {phoneNumber}</p>
      </div>
    </div>
  );
};

export default UserCard;
