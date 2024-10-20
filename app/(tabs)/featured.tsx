import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const BagelItem = ({ image, title, tag, price, calories, description }) => {
  const [showPopup, setShowPopup] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.8))[0];

  const handleAddToBag = () => {
    setShowPopup(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Hide the popup after 2 seconds
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowPopup(false));
    }, 2000);
  };

  return (
    <View style={styles.itemContainer}>
      <Image resizeMode="cover" source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tag}>{tag}</Text>
        <Text style={styles.price}>
          {price} | {calories}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToBag}>
        <Text style={styles.addButtonText}>ADD TO BAG</Text>
      </TouchableOpacity>

      {showPopup && (
        <Animated.View
          style={[
            styles.popup,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.popupEmoji}>👍</Text>
          <Text style={styles.popupText}>Added to Bag!</Text>
        </Animated.View>
      )}
    </View>
  );
};

const BagelMenu = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: 60 }} showsVerticalScrollIndicator={false}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: '700',
          color: '#800000',
          marginTop: 10,
          marginBottom: 15,
        }}
      >
       Our featured meals of the week
      </Text>
        <BagelItem
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/16a28a9f0f07ee7999b8bed39af435d7407c0f1c0e67eb7468406dc5ee96e69e?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e"
          title="Lox and Cream Cheese Bagel"
          tag="Most Popular"
          price="$6.99"
          calories="750 cal."
          description="Smoked Salmon, Cream Cheese, Cucumbers, Lettuce, on a fresh sesame bagel"
        />
        <BagelItem
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/0da4fa5f273946dee6666db0990ddf4560b91dc35e79745a6b09f12942862fdb?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e"
          title="The DSavage"
          tag="NEW!"
          price="$7.99"
          calories="800 cal."
          description="Bacon, Sausage, Cheese, and Eggs on a Toasted Bagel"
        />
        {/* Add more BagelItem components as needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  infoContainer: {
    marginTop: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  tag: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#ff6347",
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#888",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#800000",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  popup: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  popupEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  popupText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BagelMenu;
