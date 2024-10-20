import { Redirect } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const index = () => {
    return <Redirect href="signUp"/>
};

export default index;