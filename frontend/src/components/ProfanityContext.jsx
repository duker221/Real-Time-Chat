import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import leoProfanity from 'leo-profanity';

const ProfanityContext = createContext();

export const ProfanityProvider = ({ children }) => {
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    leoProfanity.loadDictionary('ru');
    leoProfanity.loadDictionary('en');
    setFilter(leoProfanity);
  }, []);

  return (
    <ProfanityContext.Provider value={filter}>
      {children}
    </ProfanityContext.Provider>
  );
};

export const useProfanityFilter = () => useContext(ProfanityContext);
