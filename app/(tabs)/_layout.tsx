// app/_layout.js
import React from 'react';
import { Tabs } from 'expo-router';
import CustomTabBar from '../customTabs';
 // Adjust the path as necessary

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      // Pass the custom tab bar component directly
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="menu" />
      <Tabs.Screen name="featured" />
      <Tabs.Screen name="rewards" />
    </Tabs>
  );
}
