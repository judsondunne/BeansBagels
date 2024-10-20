// app/layout.jsx

import React from "react";
import { Stack } from "expo-router";
// Adjust the path based on your project structure
import { View,  StyleSheet } from "react-native";
import { AuthProvider } from "./contexts/authContext";


const StackLayout = () => {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            {/* Optional: You can add a global loading indicator here if needed */}
        </AuthProvider>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default StackLayout;
