import { Stack } from 'expo-router';
import { useRouter, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, View, StyleSheet } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import { DrawerActions } from '@react-navigation/native';

export default function DrawerLayout() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      // @ts-ignore: dispatch exists but TypeScript doesn't recognize it
      navigation.dispatch(DrawerActions.openDrawer());
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
          presentation: 'card',
        }}
      >
        <Stack.Screen 
          name="meditation" 
          options={{ 
            title: "Meditation",
          }} 
        />
        <Stack.Screen 
          name="yoga" 
          options={{ 
            title: "Yoga",
          }} 
        />
        <Stack.Screen 
          name="exercise" 
          options={{ 
            title: "Exercise",
          }} 
        />
        <Stack.Screen 
          name="books" 
          options={{ 
            title: "Ancient Books",
          }} 
        />
        <Stack.Screen 
          name="privacy" 
          options={{ 
            title: "Privacy Policy",
          }} 
        />
        <Stack.Screen 
          name="diet" 
          options={{ 
            title: "Diet & Hygiene",
          }} 
        />
        <Stack.Screen 
          name="importance" 
          options={{ 
            title: "Importance of Ayurveda",
          }} 
        />
      </Stack>
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 