// import { createContext } from "react";

// export const MyContext = createContext();
// Context.js

import React, { createContext, useState } from 'react';

export const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [addToCart, setAddToCart] = useState([]);

  return (
    <MyContext.Provider value={{ addToCart, setAddToCart }}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
