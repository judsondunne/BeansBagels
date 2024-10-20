// screens/SignUpScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, firestore } from '../app/config/firebase'; // Ensure correct import paths
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const SignUpScreen = ({ navigation }) => {
    const router = useRouter();
  // State variables for user input and UI control
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  // Handle the Sign-Up process
  const handleSignUp = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Validations
    if (!validateEmail(trimmedEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (trimmedUsername.length < 3) {
      Alert.alert('Invalid Username', 'Username must be at least 3 characters long.');
      return;
    }

    if (trimmedPassword.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: trimmedUsername });

      // Save additional user info to Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        username: trimmedUsername,
        email: trimmedEmail,
        createdAt: Timestamp.now(),
        favBagel: 'Bacon Egg and Cheese',
        // Add other fields as necessary
      });
      router.push({
        pathname: '/menu'

      })

      Alert.alert('Success', 'Account created successfully!');
    
    } catch (error) {
      console.error('Sign Up Error:', error);
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak.';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation to Sign-In screen
  const handleNavigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.brandName}>Bean's Bagels</Text>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#646464"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#646464"
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#646464"
          style={styles.input}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}

        {/* Navigation to Sign-In screen if the user already has an account */}
        <Text style={styles.switchText}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={handleNavigateToSignIn}>
            Sign In
          </Text>
        </Text>

        {/* Terms and Privacy Policy */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By signing up, you agree to our
            <Text style={styles.link}> Terms </Text>and
            <Text style={styles.link}> Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff', // Optional: Set background color
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  brandName: {
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 40, // Adjusted for better spacing
    marginTop: -100, // Adjusted to position correctly
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    padding: 15,
    paddingLeft: 25,
    backgroundColor: '#EBEAEA',
    width: '100%',
    borderRadius: 7,
    fontSize: 16,
    marginTop: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#070707',
    padding: 15,
    marginTop: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#636363',
  },
  link: {
    color: '#397CCD',
    textDecorationLine: 'underline',
  },
  loader: {
    marginTop: 20,
  },
  termsContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#636363',
    textAlign: 'center',
  },
});

export default SignUpScreen;
