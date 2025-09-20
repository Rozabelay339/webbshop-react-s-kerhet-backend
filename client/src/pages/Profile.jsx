import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <p>Please log in to view your profile.</p>;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <img
        src={`https://i.pravatar.cc/150?u=${user.email}`}
        alt={user.name}
        className="profile-image"
      />
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <button className="btn-logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
