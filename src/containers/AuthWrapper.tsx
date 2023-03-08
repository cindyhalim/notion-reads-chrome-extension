import React from "react";

import authenticate from "../utils/authentication";

import UnauthenticatedView from "../views/UnauthenticatedView";

const INTERVAL_DURATION_IN_MS = 10 * 1000;

export default function AuthWrapper({ children }: React.PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null
  );

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const isAuthenticated = await authenticate.getIsAuthenticated();
      setIsAuthenticated(isAuthenticated);
    }, INTERVAL_DURATION_IN_MS);

    return () => clearInterval(interval);
  });

  React.useEffect(() => {
    const getIsAuthenticated = async () => {
      const isAuthenticated = await authenticate.getIsAuthenticated();
      setIsAuthenticated(isAuthenticated);
    };
    getIsAuthenticated();
  }, []);

  return isAuthenticated ? <>{children}</> : <UnauthenticatedView />;
}
