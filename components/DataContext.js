// DataContext.js
import React, { createContext, useState, useContext } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataMessage, setDataMessage] = useState(""); // เริ่มต้นด้วยค่าว่าง

  return (
    <DataContext.Provider
      value={{
        dataMessage,
        setDataMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
