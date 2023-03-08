import { useQuery } from "@tanstack/react-query";
import React from "react";

import operations from "./api/operations";

import AuthWrapper from "./containers/AuthWrapper";
import BookView from "./views/BookView";
import Footer from "./views/Footer";
import Header from "./views/Header";
import Settings from "./views/SettingsView";

function App() {
  const [showSettings, setShowSettings] = React.useState<boolean>(false);
  const { data } = useQuery(
    [operations.getNotionMetadata.key],
    operations.getNotionMetadata.fn
  );

  function handleSettingsClick() {
    setShowSettings(!showSettings);
  }

  function handleOnBackSettingsClick() {
    setShowSettings(false);
  }
  return (
    <div className="h-[500px] w-[400px] relative">
      <AuthWrapper>
        {showSettings ? (
          <Settings onBackClick={handleOnBackSettingsClick} />
        ) : (
          <>
            <Header />
            <BookView databaseId={data?.readListDetails?.databaseId ?? null} />
            <Footer handleSettingsClick={handleSettingsClick} />
          </>
        )}
      </AuthWrapper>
    </div>
  );
}

export default App;
