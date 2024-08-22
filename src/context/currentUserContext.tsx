import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/user'; // Certifique-se de que o caminho está correto

interface UserContextProps {
  currentUser: User | undefined;
  setCurrentUser: (user: User | undefined) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};