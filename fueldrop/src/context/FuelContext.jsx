// src/context/FuelContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FuelContext = createContext(null);

export function FuelProvider({ children }) {
  const [livePrices, setLivePrices] = useState({
    Diesel: null,
    Petrol: null,
    loaded: false,
  });

  const updatePrices = (prices) => {
    if (prices && prices.diesel && prices.petrol) {
      setLivePrices({
        Diesel: prices.diesel,
        Petrol: prices.petrol,
        loaded: true,
      });
    }
  };

  return (
    <FuelContext.Provider value={{ livePrices, updatePrices }}>
      {children}
    </FuelContext.Provider>
  );
}

export function useFuelPrices() {
  return useContext(FuelContext);
}