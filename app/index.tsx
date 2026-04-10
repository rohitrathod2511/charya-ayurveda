import { useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Index() {
	const router = useRouter();
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const buttonScale = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		// Hide the native splash screen immediately
		SplashScreen.hideAsync();

		// Start our custom animations
		Animated.sequence([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 2000,
				useNativeDriver: true,
			})
		]).start();

		Animated.loop(
			Animated.sequence([
				Animated.timing(buttonScale, {
					toValue: 1.1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(buttonScale, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
			])
		).start();
	}, []);

	const handleGetStarted = () => {
		try {
			router.replace('/(tabs)/home');
		} catch (error) {
			console.log("Navigation error:", error);
		}
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/images/Splash.jpg')}
				style={styles.backgroundImage}
				resizeMode="cover"
			>
				<Animated.View style={[styles.content, { opacity: fadeAnim }]}>
					<Text variant="displayLarge" style={styles.title}>
						Self Medication
					</Text>
					<Text variant="titleLarge" style={styles.subtitle}>
						Ayurveda for Life
					</Text>
					<TouchableOpacity
						onPress={handleGetStarted}
						style={styles.buttonContainer}
					>
						<Animated.View
							style={[
								styles.button,
								{ transform: [{ scale: buttonScale }] }
							]}
						>
							<Text style={styles.buttonText}>Get Started</Text>
						</Animated.View>
					</TouchableOpacity>
				</Animated.View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	title: {
		color: '#fff',
		textAlign: 'center',
		marginBottom: 10,
		fontWeight: 'bold',
	},
	subtitle: {
		color: '#fff',
		textAlign: 'center',
		marginBottom: 40,
	},
	buttonContainer: {
		marginTop: 20,
	},
	button: {
		backgroundColor: '#4CAF50',
		paddingHorizontal: 40,
		paddingVertical: 15,
		borderRadius: 30,
		elevation: 5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});