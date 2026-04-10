import { Drawer } from 'expo-router/drawer';
import { useEffect, useState, Component, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Sidebar from './components/Sidebar';

SplashScreen.preventAutoHideAsync();

class ErrorBoundary extends Component<
	{ children: ReactNode; fallback: ReactNode },
	{ hasError: boolean }
> {
	constructor(props: { children: ReactNode; fallback: ReactNode }) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}

function FallbackScreen() {
	return (
		<View style={styles.fallbackContainer}>
			<Text style={styles.fallbackTitle}>Something went wrong</Text>
			<Text style={styles.fallbackText}>Please restart the app</Text>
		</View>
	);
}

export default function RootLayout() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const prepareApp = async () => {
			try {
				await new Promise(resolve => setTimeout(resolve, 100));
				setIsReady(true);
			} catch (e) {
				console.error('Preparation error:', e);
				setIsReady(true);
			}
		};

		prepareApp();

		const timeoutId = setTimeout(() => {
			SplashScreen.hideAsync().catch(() => {});
		}, 5000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	useEffect(() => {
		if (isReady) {
			SplashScreen.hideAsync().catch(() => {});
		}
	}, [isReady]);

	return (
		<ErrorBoundary fallback={<FallbackScreen />}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<PaperProvider>
					<Drawer
						screenOptions={{
							headerShown: false,
							drawerStyle: { width: '75%' },
						}}
						drawerContent={(props) => <Sidebar {...props} />}
					>
						<Drawer.Screen
							name="(tabs)"
							options={{
								headerShown: false,
								drawerItemStyle: { display: 'none' },
							}}
						/>
						<Drawer.Screen
							name="(drawer)"
							options={{
								headerShown: false,
								drawerItemStyle: { display: 'none' },
							}}
						/>
					</Drawer>
				</PaperProvider>
			</GestureHandlerRootView>
		</ErrorBoundary>
	);
}

const styles = StyleSheet.create({
	fallbackContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
		padding: 20,
	},
	fallbackTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#0B3B2D',
		marginBottom: 10,
	},
	fallbackText: {
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
	},
});