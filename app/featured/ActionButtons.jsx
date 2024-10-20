import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ActionButtons = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Delivered hot and fresh, right to your door
      </Text>
      <TouchableOpacity
        onPress={() => {
          console.log("tyring");
          router.push({
            pathname: "/menu",
          });
        }}
        style={styles.viewMenuButton}
      >
        <Text style={styles.viewMenuText}>View menu</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.viewOrdersText}>View All My orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    width: "100%",
    maxWidth: 314,
    paddingHorizontal: 53,
    paddingVertical: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "700",
    textAlign: "center",
  },
  viewMenuButton: {
    borderRadius: 26,
    marginTop: 23,
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: "rgba(128, 0, 0, 1)",
  },
  viewMenuText: {
    color: "white",
    fontSize: 9,
    fontWeight: "700",
  },
  viewOrdersText: {
    fontSize: 9,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "600",
    marginTop: 23,
  },
});

export default ActionButtons;
