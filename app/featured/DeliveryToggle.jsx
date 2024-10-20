import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const DeliveryToggle = () => {
  const [selectedOption, setSelectedOption] = useState('PICKUP');

  return (
    <View style={{ display: 'flex', flexDirection: 'row', gap: 34, fontSize: 12, fontWeight: '600' }}>
      <View style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, flexShrink: 1 }}>
        <TouchableOpacity
          style={{
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            paddingHorizontal: 41,
            paddingVertical: 11,
            backgroundColor: selectedOption === 'PICKUP' ? 'rgba(128, 0, 0, 1)' : 'transparent',
            borderColor: 'rgba(128, 0, 0, 1)',
            borderWidth: selectedOption === 'PICKUP' ? 0 : 2,
          }}
          onPress={() => setSelectedOption('PICKUP')}
        >
          <Text style={{ color: selectedOption === 'PICKUP' ? 'rgba(255, 255, 255, 1)' : 'rgba(128, 0, 0, 1)' }}>
            PICKUP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            paddingHorizontal: 34,
            paddingVertical: 11,
            backgroundColor: selectedOption === 'DELIVERY' ? 'rgba(128, 0, 0, 1)' : 'transparent',
            borderColor: 'rgba(128, 0, 0, 1)',
            borderWidth: selectedOption === 'DELIVERY' ? 0 : 2,
          }}
          onPress={() => setSelectedOption('DELIVERY')}
        >
          <Text style={{ color: selectedOption === 'DELIVERY' ? 'rgba(255, 255, 255, 1)' : 'rgba(128, 0, 0, 1)' }}>
            DELIVERY
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        resizeMode="contain"
        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/553a6df2e058a01754e42783848cdacded90bf667e97e2c2f959c38d9042706f?placeholderIfAbsent=true&apiKey=6113163075f34496bcb129d0ae32690e' }}
        style={{ width: 31, aspectRatio: 0.91 }}
      />
    </View>
  );
};

export default DeliveryToggle;
