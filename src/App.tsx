import React from "react";

import AuthWrapper from "./containers/AuthWrapper";
import BookView from "./views/BookView";
import Header from "./views/Header";

function App() {
  return (
    <div
      style={{
        height: "500px",
        width: "400px",
      }}
    >
      <AuthWrapper>
        <Header />
        <BookView />
      </AuthWrapper>
    </div>
  );
}

export default App;
