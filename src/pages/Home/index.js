import React from "react";

const Home = ({ auth }) => (
  <div>
    <h1>Home test</h1>
    <button
      onClick={() => {
        console.log(auth)
        auth.signOut();
      }}
    >
      Logout
    </button>
  </div>
);

export default Home;
