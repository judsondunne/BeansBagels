import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const BaconEggCheese = () => {
  // State to manage selected add-ons
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // Add-On Data
  const addOns = [
    
    {
      id: 3,
      name: 'Add Hashbrown',
      price: 2.5,
      imageUri:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/d5285e7d9f8d85fd1dad1fdf4d0a28201cab17eeadb51d9767e678b1e83820e6?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e',
    },
  ];

  // Function to toggle add-on selection
  const toggleAddOn = (id) => {
    setSelectedAddOns((prevSelected) => {
      if (prevSelected.includes(id)) {
        // If already selected, remove it
        return prevSelected.filter((addOnId) => addOnId !== id);
      } else {
        // If not selected, add it
        return [...prevSelected, id];
      }
    });
  };

  // Calculate total price based on selected add-ons
  const basePrice = 9.5;
  const totalAddOnsPrice = selectedAddOns.reduce((total, addOnId) => {
    const addOn = addOns.find((item) => item.id === addOnId);
    return addOn ? total + addOn.price : total;
  }, 0);
  const totalPrice = (basePrice + totalAddOnsPrice).toFixed(2);

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <ImageBackground
        resizeMode="cover"
        source={{
          uri:
            'https://thefreshfig.com/wp-content/uploads/2023/03/1200x1600-2023-03-28T070456.321.png',
        }}
        style={styles.imageBackground}
      >
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Image
              resizeMode="contain"
              source={{
                uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f9d914427fa6bb23a3b23a614662b59b5493bec77564072a422b87a4a8ea4c2f?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e',
              }}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Image
              resizeMode="contain"
              source={{
                uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/94e19f6eb03b5f816604608f468a982bc921795ff2a0dc0581b71b63bbfa8591?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e',
              }}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Content Section */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>Hash-Browns</Text>

        {/* Rating Section */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ 4.5</Text>
          <Text style={styles.reviewText}>(30+)</Text>
          <TouchableOpacity>
            <Text style={styles.seeReviewText}>See Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Price and Add to Cart */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${totalPrice}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Image
              resizeMode="contain"
              source={{
                uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/10aebe1a852239388b0f2e247961d30c5d0d9787828725a75d29f19cb37fef96?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e',
              }}
              style={styles.addIcon}
            />
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                fontWeight: '500',
                marginTop: 10,
                marginRight: 20,
                paddingBottom: 25,
              }}
            >
              Add to bag
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description}>
        Crispy, golden-fried shredded potatoes, perfect as a side to your bagel sandwich.
        </Text>

        {/* Add Ons */}
        <Text style={styles.addOnTitle}>Choice of Add On</Text>
        <View style={styles.addOnContainer}>
          {/* Add-On Items */}
          <View style={styles.addOnItems}>
            {addOns.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.addOnItem,
                  selectedAddOns.includes(item.id) && styles.addOnItemSelected,
                ]}
                onPress={() => toggleAddOn(item.id)}
              >
                <Image
                  resizeMode="contain"
                  source={{
                    uri: item.imageUri,
                  }}
                  style={styles.addOnImage}
                />
                <Text style={styles.addOnText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Add-On Prices and Buttons */}
          <View style={styles.addOnPrices}>
            {addOns.map((item) => (
              <View key={item.id} style={styles.addOnPriceContainer}>
                <Text style={styles.addOnPriceText}>
                  {item.price > 0 ? `+$${item.price.toFixed(2)}` : '$0.00'}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.addOnButton,
                    selectedAddOns.includes(item.id) && styles.addOnButtonSelected,
                  ]}
                  onPress={() => toggleAddOn(item.id)}
                >
                  {selectedAddOns.includes(item.id) && (
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bcb8aa9d2ad5f67d08ad7c95c01cb940495e2ad9b32cc618c7f8532ba433ac27?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e',
                      }}
                      style={styles.addOnIcon}
                    />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Stylesheet for better readability and maintenance
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageBackground: {
    height: 250,
    width: 400, // Changed to '100%' for responsiveness
    justifyContent: 'space-between',
    padding: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#323643',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111719',
    marginRight: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#9796A1',
    marginRight: 10,
  },
  seeReviewText: {
    fontSize: 13,
    color: '#800000',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 35,
    fontWeight: '400',
    color: '#800000',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160, // Increased width to accommodate text
    height: 40, // Adjusted height for better alignment
    backgroundColor: '#800000',
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  addIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  description: {
    fontSize: 15,
    color: '#858992',
    lineHeight: 24,
    marginBottom: 20,
  },
  addOnTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#323643',
    marginBottom: 15,
  },
  addOnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addOnItems: {
    flex: 2,
  },
  addOnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  addOnItemSelected: {
    
  },
  addOnImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  addOnText: {
    fontSize: 14,
    color: '#000000',
    flexShrink: 1,
  },
  addOnPrices: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  addOnPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
  },
  addOnPriceText: {
    fontSize: 14,
    color: '#000000',
    marginRight: 10,
  },
  addOnButton: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#800000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addOnButtonSelected: {
    backgroundColor: '#800000',
  },
  addOnIcon: {
    width: 16,
    height: 16,
    tintColor: 'white',
  },
});

export default BaconEggCheese;
