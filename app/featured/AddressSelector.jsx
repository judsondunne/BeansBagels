import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AddressSelector = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Deliver to</Text>
      <Image
        resizeMode="contain"
        source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6eb1704f1edff43308f398439f3f93a7b5b7316acf389762f03c364744b76d0?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e" }}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 3,
  },
  label: {
    fontSize: 14,
    color: 'rgba(140, 144, 153, 1)',
    textAlign: 'center',
  },
  icon: {
    width: 8,
    aspectRatio: 1.33,
  },
});

export default AddressSelector;