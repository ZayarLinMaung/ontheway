import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://your-api-endpoint/profile.php?id=${userId}`
        );
        const data = await response.json();

        console.log(data); // Check the entire response

        if (data.success) {
          setProfile(data.user);
        } else {
          setMessage(data.message || "An error occurred");
        }
      } catch (error) {
        setMessage("An error occurred while fetching the profile.");
        console.error(error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (message) {
    return <p>{message}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-picture">
        <img
          src={profile.profile_picture || "/default-profile.png"}
          alt="Profile"
        />
      </div>
      <div className="profile-details">
        <p>
          <strong>Username:</strong> {profile.username}
        </p>
      </div>
    </div>
  );
};

export default Profile;
