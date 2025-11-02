import React from "react";

const Navbar = ({ onLogout, user }) => (
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
    <div>Logged in as <strong>{user}</strong></div>
    <div>
      <button onClick={onLogout}>Logout</button>
    </div>
  </div>
);

export default Navbar;
