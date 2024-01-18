import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import FiveColumnWithBackground from "components/footers/FiveColumnWithBackground";
import UserCard from "./UserCard";
import './UserCard.css'
import UsImg from './UserImage.jpg';
const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    userId: 'johndoe123',
    email: 'john.doe@example.com',
    phoneNumber: '+1 555-1234',
    imageUrl: UsImg, // Example image URL
  };

  return(
    <AnimationRevealPage>
      <Header />
      <div className="user-card-container">
        <UserCard user={user} />
      </div>
      <FiveColumnWithBackground/>
    </AnimationRevealPage>

  );
};

export default ProfilePage;