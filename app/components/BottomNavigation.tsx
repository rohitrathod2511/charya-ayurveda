import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const tabs = [
	{
		name: 'home',
		icon: 'home',
		label: 'मुख्यपृष्ठ',
		path: '/(tabs)/home'
	},
	{
		name: 'disorders',
		icon: 'hospital-box',
		label: 'व्याधी',
		path: '/(tabs)/disorders'
	},
	{
		name: 'prakriti',
		icon: 'account-heart',
		label: 'प्रकृती',
		path: '/(tabs)/prakriti'
	},
	{
		name: 'advice',
		icon: 'message-text',
		label: 'सल्ला',
		path: '/(tabs)/advice'
	}
];

export default function BottomNavigation() {
	const router = useRouter();
	const currentPath = usePathname();

	const isActive = (path: string) => {
		if (currentPath.includes('(tabs)')) {
			return currentPath === path;
		}
		// For drawer routes, we want to keep the last active tab highlighted
		return false;
	};
	const handlePress = (path: string) => {
		router.push(path as any);
	};

	return (
		<View style={styles.container}>
			{tabs.map((tab) => (
				<TouchableOpacity
					key={tab.name}
					style={styles.tab}
					onPress={() => handlePress(tab.path)}
				>
					<View style={styles.tabContent}>
						<MaterialCommunityIcons
							name={tab.icon as any}
							size={24}
							color={isActive(tab.path) ? '#D4B895' : 'rgba(255, 255, 255, 0.7)'}
						/>
						<Text
							style={[
								styles.tabLabel,
								{
									color: isActive(tab.path) ? '#D4B895' : 'rgba(255, 255, 255, 0.7)'
								}
							]}
						>
							{tab.label}
						</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#0B3B2D',
		height: 65,
		borderTopWidth: 0,
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 8,
	},
	tabContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabLabel: {
		fontSize: 12,
		marginTop: 4,
		fontFamily: 'Poppins-Regular',
		textAlign: 'center',
	},
});