// components/CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CustomTabBar = () => {
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];

  const tabs = [
    { name: 'menu', label: 'Menu', icon: 'restaurant' },
    { name: 'featured', label: 'Featured', icon: 'star' },
    { name: 'rewards', label: 'Rewards', icon: 'gift' },
  ];

  const handlePress = (name) => {
    if (currentRoute !== name) {
      router.push(`/${name}`);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => handlePress(tab.name)}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={currentRoute === tab.name ? '#007AFF' : '#8e8e93'}
          />
          <Text style={[styles.label, currentRoute === tab.name && styles.activeLabel]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 90,
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 4,
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default CustomTabBar;
