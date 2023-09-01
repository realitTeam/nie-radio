import React from "react";

const ProtectedPage = ({ userRole }) => {
  return (
    <div>
      {userRole === "admin" ? <h1>Admin Content</h1> : <h1>User Content</h1>}
    </div>
  );
};

export default ProtectedPage;
