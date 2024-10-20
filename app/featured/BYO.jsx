import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

// Centralized Ingredient Data
const ingredientsData = {
  // MEATS
  BACON: {
    price: "$1.25",
    calories: "20 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/471ceba802b2ef393707b375f21704e237f1323bc1040cac11359773a86f2749?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  Sausage: {
    price: "$1.25",
    calories: "20 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f7791fd5751247f4f63e0cc4fd001cc48fb67209030a7fddb6ed2d687b83ce5e?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  "Pork Roll": {
    price: "$1.25",
    calories: "20 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c99e8ca81add846f0ac265f035c7f855dd96b7717ff3170727d543d6b584a074?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  "No Meat": {
    price: "-$1.25",
    calories: "0 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d5e1482d71f47aa99486a14efccd09d51bd6c6cd2e52031b8ccf41fe7be56c35?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },

  // EGGS
  Scrambled: {
    price: "$1.25",
    calories: "20 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ac9ac005ee8dc1e39e383adf528929b2a1cc6bb5742e4e06c820176e5d7fa18d?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  Fried: {
    price: "$1.25",
    calories: "20 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/568ef0d099c11c95cb0c11c1aa05c9ce1d3c03ef2322518f6f4f859f7eaa03ef?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  "No Egg": {
    price: "$0.00",
    calories: "0 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d5e1482d71f47aa99486a14efccd09d51bd6c6cd2e52031b8ccf41fe7be56c35?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },

  // CHEESE
  Cheese: {
    price: "$1.00",
    calories: "100 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7e1880e0db5a390ffb3eab350ccb2e8a9273eb8c725acb726fd4ba5389676f55?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  "No Cheese": {
    price: "$0.00",
    calories: "0 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d5e1482d71f47aa99486a14efccd09d51bd6c6cd2e52031b8ccf41fe7be56c35?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },

  // EXTRAS
  "Add Hashbrown": {
    price: "+$1.25",
    calories: "20 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c30e313491ab59bedff128245b7c0a9195ece457cee4d3d34caca7a1ecd99caf?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  Salt: {
    price: "+$0.00",
    calories: "0 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/77397f428ac8bc54ef91537aa3961ccd06d5b4f7434353fb2eaa5810e163c897?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  Pepper: {
    price: "+$0.00",
    calories: "0 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/eac8f7a5bca351ba5ad6f95a09b370797ae810d7e942786a30c2215e8fb314d8?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  Ketchup: {
    price: "+$0.25",
    calories: "5 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e9616e512bcab06ba4273720d7c69667dc3ffc8198ea5ea07bbacdeeef245ad9?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  "Hot Sauce": {
    price: "+$0.25",
    calories: "5 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/38db9573a12fdf578d0ffff75bec459706f8e595544cd8ba0aff5237ce2c9c64?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
  Toasted: {
    price: "+$0.50",
    calories: "0 cal",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d2d816f5a5e4aa24d6bc3671d94e26206c7c3fd5a642b7a4aa8ba379da881b25?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
  },
};

// Selected Ingredient Item Component for Summary
const SelectedIngredientItem = ({ name }) => {
  const { price, calories, imageUri } = ingredientsData[name] || {};

  return (
    <View style={styles.selectedIngredientItem}>
      <Image
        resizeMode="contain"
        source={{ uri: imageUri }}
        style={styles.selectedIngredientImage}
      />
      <View style={styles.selectedIngredientInfo}>
        <Text style={styles.selectedIngredientName}>{name}</Text>
        <View style={styles.selectedPriceCalorieContainer}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.calories}>{calories}</Text>
        </View>
      </View>
    </View>
  );
};

// Summary Section Component
const SummarySection = ({ selectedIngredients }) => (
  <View style={styles.summaryContainer}>
    <Text style={styles.summaryTitle}>Your Selection:</Text>
    {selectedIngredients.length > 0 ? (
      selectedIngredients.map((ingredient, index) => (
        <SelectedIngredientItem key={index} name={ingredient} />
      ))
    ) : (
      <Text style={styles.summaryItem}>No ingredients selected.</Text>
    )}
  </View>
);

// Section Header Component
const SectionHeader = ({ title }) => (
  <View>
    <Text style={styles.sectionHeader}>{title}</Text>
    <View style={styles.divider} />
  </View>
);

// Ingredient Item Component
const IngredientItem = ({ name, isSelected, onPress }) => {
  const { price, calories, imageUri } = ingredientsData[name] || {};

  return (
    <TouchableOpacity
      style={[styles.ingredientItem, isSelected && styles.selectedItem]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Ingredient Image */}
      <Image
        resizeMode="contain"
        source={{ uri: imageUri }}
        style={styles.ingredientImage}
      />

      {/* Ingredient Info */}
      <View style={styles.ingredientInfo}>
        <Text style={styles.ingredientName}>{name}</Text>
        <View style={styles.priceCalorieContainer}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.calories}>{calories}</Text>
        </View>
      </View>
      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Text style={styles.addButtonText}>{isSelected ? "−" : "+"}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// Main Component
const BuildYourOwn = () => {
  // State to keep track of selected ingredients
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // State for Modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to toggle ingredient selection
  const toggleIngredient = (name) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(name)) {
        return prevSelected.filter((item) => item !== name);
      } else {
        return [...prevSelected, name];
      }
    });
  };

  // Check if an ingredient is selected
  const isSelected = (name) => selectedIngredients.includes(name);

  // Function to handle Add to Cart
  const handleAddToCart = () => {
    if (selectedIngredients.length === 0) {
      // Optionally, you can show a different modal or feedback
      return;
    }
    setIsModalVisible(true);
    // Optionally, reset selections after adding to cart
    // setSelectedIngredients([]);
  };

  // Function to close Modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/70a931d91652c36c99ecca59e86893f8e48d03b9a8089f88354f4b9dec5598d9?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
            }}
            style={styles.headerIcon}
          />
          <Image
            resizeMode="contain"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/d75e17667dcd3ebccb58cd3eaabb28353435213aa26e6ba8c16a690318dfb649?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
            }}
            style={styles.headerIcon}
          />
        </View>

        {/* Title Section */}
        <Text style={styles.title}>Build Your</Text>
        <Text style={styles.subtitle}>Sandwich</Text>
        <Image
          resizeMode="contain"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c754c2d498ff04480f590f117562d760c118c7a3fc2f1c68f5379fd14df24df?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e",
          }}
          style={styles.sandwichImage}
        />

        {/* MEATS Section */}
        <SectionHeader title="MEATS" />
        <IngredientItem
          name="BACON"
          isSelected={isSelected("BACON")}
          onPress={() => toggleIngredient("BACON")}
        />
        <IngredientItem
          name="Sausage"
          isSelected={isSelected("Sausage")}
          onPress={() => toggleIngredient("Sausage")}
        />
        <IngredientItem
          name="Pork Roll"
          isSelected={isSelected("Pork Roll")}
          onPress={() => toggleIngredient("Pork Roll")}
        />
        <IngredientItem
          name="No Meat"
          isSelected={isSelected("No Meat")}
          onPress={() => toggleIngredient("No Meat")}
        />

        {/* EGGS Section */}
        <SectionHeader title="EGGS" />
        <IngredientItem
          name="Scrambled"
          isSelected={isSelected("Scrambled")}
          onPress={() => toggleIngredient("Scrambled")}
        />
        <IngredientItem
          name="Fried"
          isSelected={isSelected("Fried")}
          onPress={() => toggleIngredient("Fried")}
        />
        <IngredientItem
          name="No Egg"
          isSelected={isSelected("No Egg")}
          onPress={() => toggleIngredient("No Egg")}
        />

        {/* CHEESE Section */}
        <SectionHeader title="CHEESE" />
        <IngredientItem
          name="Cheese"
          isSelected={isSelected("Cheese")}
          onPress={() => toggleIngredient("Cheese")}
        />
        <IngredientItem
          name="No Cheese"
          isSelected={isSelected("No Cheese")}
          onPress={() => toggleIngredient("No Cheese")}
        />

        {/* Extras Section */}
        <SectionHeader title="Extras" />
        <IngredientItem
          name="Add Hashbrown"
          isSelected={isSelected("Add Hashbrown")}
          onPress={() => toggleIngredient("Add Hashbrown")}
        />
        <IngredientItem
          name="Salt"
          isSelected={isSelected("Salt")}
          onPress={() => toggleIngredient("Salt")}
        />
        <IngredientItem
          name="Pepper"
          isSelected={isSelected("Pepper")}
          onPress={() => toggleIngredient("Pepper")}
        />
        <IngredientItem
          name="Ketchup"
          isSelected={isSelected("Ketchup")}
          onPress={() => toggleIngredient("Ketchup")}
        />
        <IngredientItem
          name="Hot Sauce"
          isSelected={isSelected("Hot Sauce")}
          onPress={() => toggleIngredient("Hot Sauce")}
        />
        <IngredientItem
          name="Toasted"
          isSelected={isSelected("Toasted")}
          onPress={() => toggleIngredient("Toasted")}
        />

        {/* Summary Section */}
        <SummarySection selectedIngredients={selectedIngredients} />

        {/* Add to Cart Button */}
      </ScrollView>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      {/* Custom Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
              
                
                <Text style={styles.modalText}>Added to Cart!</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 40, // Extra padding for Add to Cart button
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(76, 29, 9, 1)",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "600",
    color: "rgba(73, 26, 6, 1)",
    textAlign: "center",
    marginBottom: 20,
  },
  sandwichImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(76, 29, 10, 1)",
    marginTop: 20,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(178, 160, 153, 1)",
    marginBottom: 15,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(245, 245, 245, 1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedItem: {
    backgroundColor: "rgba(240, 240, 240, 1)",
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#800000", // Dark Red
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  ingredientImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 5,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(83, 38, 19, 1)",
    marginBottom: 5,
  },
  priceCalorieContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(130, 110, 102, 1)",
  },
  calories: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 140,
    color: "rgba(141, 123, 115, 1)",
  },
  summaryContainer: {
    marginTop: 30,
    padding: 15,
    borderTopWidth: 1,
    marginBottom: 100,
    borderTopColor: "rgba(178, 160, 153, 1)",
  },
  summaryTitle: {
    fontSize: 18,

    fontWeight: "600",
    color: "rgba(76, 29, 10, 1)",
    marginBottom: 10,
  },
  summaryItem: {
    fontSize: 16,
    color: "rgba(83, 38, 19, 1)",
    marginBottom: 5,
  },
  selectedIngredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedIngredientImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
  },
  selectedIngredientInfo: {
    flex: 1,
  },
  selectedIngredientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(83, 38, 19, 1)",
  },
  selectedPriceCalorieContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addToCartButton: {
    backgroundColor: "#800000", // Dark Red
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    width: "70%",
    marginLeft: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,

    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#800000",
    textAlign: "center",
  },
});

export default BuildYourOwn;
