// app/profile/page.tsx
import React from "react";
import Profile from "@/components/user/StudentProfile"; // adjust path if needed

const ProfilePage = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4">My Profile</h2>
      <Profile />
    </div>
  );
};

export default ProfilePage;
