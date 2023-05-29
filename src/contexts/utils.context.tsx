import React, { ReactNode, useEffect, useState } from "react";
import { IUtils } from "../interfaces";

interface IProps {
  children: ReactNode,
}

export const UtilsContext = React.createContext<IUtils.Context>({ currentActiveElement: null, currentSocketConnection: null, currentPISocketConnection: null });

const UtilsProvider = ({ children }: IProps) => { // UtilsProvider can hold multiple values, and one of them is currentActiveElement
  const [currentActiveElement, setCurrentActiveElement] = useState<IUtils.ICurrentActiveElement.CurrentActiveElement>(null);
  const [currentSocketConnection, setCurrentSocketConnection] = useState<IUtils.ICurrentSocketConnection.CurrentSocketConnection>(null);
  const [currentPISocketConnection, setCurrentPISocketConnection] = useState<IUtils.ICurrentSocketConnection.CurrentSocketConnection>(null);

  useEffect(() => {
    currentSocketConnection?.send("grant");
  }, [currentSocketConnection])
  return <UtilsContext.Provider value={{ currentActiveElement: { value: currentActiveElement, set: setCurrentActiveElement }, currentSocketConnection: { value: currentSocketConnection, set: setCurrentSocketConnection }, currentPISocketConnection: { value: currentPISocketConnection, set: setCurrentPISocketConnection } }}>
    {children}
  </UtilsContext.Provider>
}

export default UtilsProvider;