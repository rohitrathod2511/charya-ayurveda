import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Sidebar from './components/Sidebar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return (
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
	);
}