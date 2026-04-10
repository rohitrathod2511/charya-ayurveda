import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	useColorScheme,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Text, Switch } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const drawerItems = [
	{
		icon: 'meditation',
		title: 'Meditation',
		route: '/(drawer)/meditation',
	},
	{
		icon: 'yoga',
		title: 'Yoga',
		route: '/(drawer)/yoga',
	},
	{
		icon: 'run',
		title: 'Exercise',
		route: '/(drawer)/exercise',
	},
	{
		icon: 'food-apple',
		title: 'Diet',
		route: '/(drawer)/diet',
	},
	{
		icon: 'book-open-page-variant',
		title: 'Ancient References',
		route: '/(drawer)/books',
	},
	{
		icon: 'shield-lock',
		title: 'Privacy Policy',
		route: '/(drawer)/privacy',
	},
];

export default function Sidebar(props: any) {
	const router = useRouter();
	const colorScheme = useColorScheme();
	const [isDarkMode, setIsDarkMode] = React.useState(colorScheme === 'dark');

	const handleNavigation = (route: string) => {
		props.navigation.closeDrawer();
		router.push({
			pathname: route,
			params: {
				from: 'drawer',
				reset: 'true'
			}
		});
	};

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<DrawerContentScrollView 
			{...props}
			style={[
				styles.container,
				{ backgroundColor: isDarkMode ? '#0B3B2D' : '#E8F5E9' }
			]}
		>
			<View style={styles.header}>
				<View style={[
					styles.logoContainer,
					{ backgroundColor: isDarkMode ? '#0F4D3A' : '#FFFFFF' }
				]}>
					<Image
						source={require('../../assets/images/SidebarLogo.jpg')}
						style={styles.logo}
					/>
				</View>
				<Text style={[
					styles.headerTitle,
					{ color: isDarkMode ? '#FFFFFF' : '#0B3B2D' }
				]}>
					Self Medication
				</Text>
			</View>

			<View style={styles.navigationContainer}>
				{drawerItems.map((item, index) => (
					<TouchableOpacity
						key={index}
						style={[
							styles.navigationItem,
							{ backgroundColor: isDarkMode ? '#0F4D3A' : '#FFFFFF' }
						]}
						onPress={() => handleNavigation(item.route)}
					>
						<MaterialCommunityIcons
							name={item.icon as any}
							size={24}
							color={isDarkMode ? '#D4B895' : '#0B3B2D'}
							style={styles.navigationIcon}
						/>
						<Text
							style={[
								styles.navigationText,
								{ color: isDarkMode ? '#FFFFFF' : '#0B3B2D' }
							]}
							numberOfLines={1}
						>
							{item.title}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			<View style={styles.footer}>
				<View style={styles.themeToggle}>
					<MaterialCommunityIcons
						name={isDarkMode ? 'weather-night' : 'weather-sunny'}
						size={24}
						color={isDarkMode ? '#D4B895' : '#0B3B2D'}
					/>
					<Text
						style={[
							styles.themeText,
							{ color: isDarkMode ? '#FFFFFF' : '#0B3B2D' }
						]}
					>
						Dark Mode
					</Text>
					<Switch
						value={isDarkMode}
						onValueChange={toggleTheme}
						color="#D4B895"
					/>
				</View>
			</View>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		padding: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#D4B89533',
		alignItems: 'center',
		marginTop: 20,
		gap: 16,
	},
	logoContainer: {
		width: 180,
		height: 180,
		borderRadius: 90,
		overflow: 'hidden',
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		borderWidth: 2,
		borderColor: '#D4B89555',
	},
	logo: {
		width: '100%',
		height: '100%',
		borderRadius: 90,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		fontFamily: 'Poppins-Bold',
	},
	navigationContainer: {
		padding: 14,
		gap: 8,
	},
	navigationItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		marginBottom: 4,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	navigationIcon: {
		width: 24,
		height: 24,
		textAlign: 'center',
		textAlignVertical: 'center',
		
	},
	navigationText: {
		marginLeft: 16,
		fontSize: 16,
		fontWeight: '500',
		fontFamily: 'Poppins-Regular',
		flex: 1,
		includeFontPadding: false,
		textAlignVertical: 'center',
		lineHeight: 24,
	},
	footer: {
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: '#D4B89533',
		marginTop: 'auto',
	},
	themeToggle: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: 'transparent',
		borderRadius: 12,
	},
	themeText: {
		fontSize: 16,
		marginLeft: 16,
		flex: 1,
		fontFamily: 'Poppins-Regular',
	},
});