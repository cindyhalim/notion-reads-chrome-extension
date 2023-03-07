import { useQuery } from "@tanstack/react-query";
import React from "react";

import operations from "./api/operations";

import AuthWrapper from "./containers/AuthWrapper";
import BookView from "./views/BookView";
import Header from "./views/Header";

function App() {
  const { data } = useQuery(
    [operations.getNotionMetadata.key],
    operations.getNotionMetadata.fn
  );

  return (
    <div className="h-[500px] w-[400px]">
      <AuthWrapper>
        <Header />
        <BookView databaseId={data?.readListDetails?.databaseId ?? null} />
      </AuthWrapper>
    </div>
  );
}

export default App;
