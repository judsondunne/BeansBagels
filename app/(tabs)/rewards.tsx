// Rewards.jsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert, // Import Alert for user feedback
} from 'react-native';

// Get device width for responsive design
const { width } = Dimensions.get('window');

const Rewards = () => {
  // Manage reward points using state
  const [points, setPoints] = useState(4000);

  // Redeemable items data
  const redeemItems = [
    {
      id: 1,
      name: 'Bacon Egg and Cheese',
      imageUri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/93a2eee993b0aeb2af379679b1ecb49ebf52d54a26abda79103e165648034260?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e',
      requiredPoints: 1000,
    },
    {
      id: 2,
      name: 'Hashbrowns',
      imageUri: 'https://thefreshfig.com/wp-content/uploads/2023/03/1200x1600-2023-03-28T070456.321.png',
      requiredPoints: 800,
    },
    {
      id: 3,
      name: 'BOY',
      imageUri: 'data:image/jpeg;base64,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',
      requiredPoints: 2200,
    },
  ];

  // Handler for redeeming items
  const handleRedeem = (item) => {
    if (points >= item.requiredPoints) {
      setPoints(points - item.requiredPoints); // Subtract points
      Alert.alert('Success', `${item.name} has been added to your cart!`); // Show confirmation
    } else {
      Alert.alert('Insufficient Points', `You need ${item.requiredPoints} points to redeem this item.`);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{points}</Text> 
          <Text style={styles.pointsLabel}>Points</Text>
        </View>
      </View>

      {/* Redeemable Items Section */}
      <View style={styles.redeemSection}>
        <Text style={styles.sectionTitle}>Redeem Your Points</Text>
        {redeemItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.imageUri }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardPoints}>{item.requiredPoints} Points</Text>
              <TouchableOpacity
                style={[
                  styles.redeemButton,
                  points >= item.requiredPoints ? styles.buttonEnabled : styles.buttonDisabled,
                ]}
                onPress={() => handleRedeem(item)}
                disabled={points < item.requiredPoints}
              >
                <Text style={styles.buttonText}>
                  {points >= item.requiredPoints ? 'Redeem' : 'Insufficient Points'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Stylesheet for the Rewards screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  contentContainer: {
    padding: 20,
    marginTop: 40,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#800000', // Dark Red
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.3, // For iOS shadow
    shadowRadius: 4, // For iOS shadow
  },
  headerTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 10,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  pointsLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 5,
    marginBottom: 5,
  },
  redeemSection: {
    // Additional styling if needed
  },
  sectionTitle: {
    fontSize: 22,
    color: '#323643',
    fontWeight: '600',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 }, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
    shadowRadius: 3, // For iOS shadow
  },
  cardImage: {
    width: width * 0.3,
    height: width * 0.3,
  },
  cardContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    color: '#323643',
    fontWeight: '600',
    marginBottom: 5,
  },
  cardPoints: {
    fontSize: 14,
    color: '#858992',
    marginBottom: 15,
  },
  redeemButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#800000', // Dark Red
  },
  buttonDisabled: {
    backgroundColor: '#D3D3D3', // Light Gray
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Rewards;
