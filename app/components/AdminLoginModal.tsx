import React from 'react';
import { Modal, Portal, TextInput, Button, Text } from 'react-native-paper';
import { View, StyleSheet, useColorScheme } from 'react-native';

interface AdminLoginModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function AdminLoginModal({ visible, onDismiss }: AdminLoginModalProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleLogin = () => {
    // Handle login logic here
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDarkMode ? '#0F4D3A' : '#FFFFFF' }
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isDarkMode ? '#FFFFFF' : '#0B3B2D' }
          ]}
        >
          Admin Login
        </Text>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
          outlineColor={isDarkMode ? '#D4B895' : '#0B3B2D'}
          activeOutlineColor={isDarkMode ? '#D4B895' : '#0B3B2D'}
          textColor={isDarkMode ? '#FFFFFF' : '#0B3B2D'}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          outlineColor={isDarkMode ? '#D4B895' : '#0B3B2D'}
          activeOutlineColor={isDarkMode ? '#D4B895' : '#0B3B2D'}
          textColor={isDarkMode ? '#FFFFFF' : '#0B3B2D'}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            buttonColor={isDarkMode ? '#D4B895' : '#0B3B2D'}
          >
            Login
          </Button>
          <Button
            mode="outlined"
            onPress={onDismiss}
            style={styles.button}
            textColor={isDarkMode ? '#D4B895' : '#0B3B2D'}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    minWidth: 120,
  },
}); 