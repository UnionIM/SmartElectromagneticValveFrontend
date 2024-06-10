import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { PingDevice } from "../api/fetchFunctions";

const ConnectionContext = createContext();

const MyConnectionProvider = ({ children }) => {
  const { data, isLoading } = useQuery("ping", PingDevice);
  const [connection, setConnection] = useState({
    connection: false,
    isLoading: true,
  });

  useEffect(() => {
    setConnection({
      connection: false,
      isLoading: isLoading,
    });
  }, [data, isLoading]);

  return (
    <ConnectionContext.Provider value={[connection, setConnection]}>
      {children}
    </ConnectionContext.Provider>
  );
};

export { ConnectionContext, MyConnectionProvider };
