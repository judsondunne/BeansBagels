// contexts/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../config/firebase"; // Adjust the import path as needed
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { View, StyleSheet, Text } from "react-native";

// Create the Auth Context
const AuthContext = createContext();

// Create a Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user object
  const [userData, setUserData] = useState(null); // Additional user data from Firestore
  const [loading, setLoading] = useState(true); // Loading state for auth

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No such document!");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Sign-in method
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      // Fetch additional user data
      const userDoc = await getDoc(doc(firestore, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    } catch (error) {
      console.error("Sign In Error:", error);
      throw error; // Let the caller handle the error
    } finally {
      setLoading(false);
    }
  };

  // Sign-up method
  const signUp = async (email, password, username) => {
    try {
      setLoading(true);
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: username });

      // Save additional user info to Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        username: username,
        email: email,
        createdAt: Timestamp.now(),
        // Add other fields as necessary
      });

      // Fetch additional user data
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }

      setUser(user);
    } catch (error) {
      console.error("Sign Up Error:", error);
      throw error; // Let the caller handle the error
    } finally {
      setLoading(false);
    }
  };

  // Sign-out method
  const signOutUser = async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error("Sign Out Error:", error);
      throw error; // Let the caller handle the error
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    userData,
    loading,
    signIn,
    signUp,
    signOut: signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && (
        <View style={styles.loadingContainer}>
         <Text>Loading</Text>
        </View>
      )}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Optional: Loading styles
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
