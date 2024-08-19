import React, { useEffect, useState } from "react";

const ProtectedComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUser(data);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Protected Page</h2>
      <p>Welcome, {user.username}!</p>
    </div>
  );
};

export default ProtectedComponent;
