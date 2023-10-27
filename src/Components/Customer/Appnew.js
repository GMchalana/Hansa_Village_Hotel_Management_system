import React from 'react';
import Orders from './Orders';
import { useUser } from './UserContext'; // Import the UserContext

function Appnew() {
  const {
    state: { user },
  } = useUser();

  return (
    <div>
      {/* ...other components... */}
      <Orders userId={user ? user.id : null} /> {/* Pass the user ID as a prop */}
    </div>
  );
}

export default Appnew;
