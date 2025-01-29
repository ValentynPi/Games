import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, onAuthStateChange } from '../services/auth';
import { getUserData } from '../services/database';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    getCurrentUser().then((user) => {
      setUser(user);
      if (user) {
        getUserData(user.id).then(setProfile);
      }
      setLoading(false);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = onAuthStateChange(async (user) => {
      setUser(user);
      if (user) {
        const profile = await getUserData(user.id);
        setProfile(profile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,        // Auth user object
    profile,     // User profile data
    loading,     // Loading state
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 