import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: styles.tabBar,
				tabBarActiveTintColor: '#D4B895',
				tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
				tabBarShowLabel: true,
				tabBarLabelStyle: styles.tabLabel,
				tabBarItemStyle: styles.tabItem,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'मुख्यपृष्ठ',
					tabBarIcon: ({ color }) => (
						<View style={styles.tabContent}>
							<MaterialCommunityIcons name="home" size={24} color={color} />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="disorders"
				options={{
					title: 'व्याधी',
					tabBarIcon: ({ color }) => (
						<View style={styles.tabContent}>
							<MaterialCommunityIcons name="hospital-box" size={24} color={color} />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="prakriti"
				options={{
					title: 'प्रकृती',
					tabBarIcon: ({ color }) => (
						<View style={styles.tabContent}>
							<MaterialCommunityIcons name="account-heart" size={24} color={color} />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="advice"
				options={{
					title: 'सल्ला',
					tabBarIcon: ({ color }) => (
						<View style={styles.tabContent}>
							<MaterialCommunityIcons name="message-text" size={24} color={color} />
						</View>
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		height: 65,
		backgroundColor: '#0B3B2D',
		borderTopWidth: 0,
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	tabLabel: {
		fontSize: 14,
		marginTop: 4,
		fontFamily: 'Poppins-Medium',
		textAlign: 'center',
		includeFontPadding: false,
		textAlignVertical: 'center',
		lineHeight: 18,
		color: '#FFFFFF',
	},
	tabItem: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 8,
		height: 65,
		flexDirection: 'column',
	},
	tabContent: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 2,
	},
});