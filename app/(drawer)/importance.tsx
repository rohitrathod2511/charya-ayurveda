import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Card, List, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ayurvedaImportance = [
	{
		title: "Holistic Approach",
		content: "Ayurveda treats the person as a whole, not just the disease. It considers physical, mental, emotional, and spiritual well-being as interconnected aspects of health."
	},
	{
		title: "Preventive Care",
		content: "Focus on preventing diseases through proper lifestyle, diet, and daily routines rather than just treating symptoms after they appear."
	},
	{
		title: "Natural Healing",
		content: "Utilizes natural herbs, minerals, and therapeutic procedures that work in harmony with the body's natural healing mechanisms."
	},
	{
		title: "Personalized Treatment",
		content: "Recognizes each person's unique constitution (Prakruti) and provides customized treatment plans based on individual needs."
	}
];

const principles = [
	{
		title: "The Three Doshas",
		content: "Vata (Air & Space), Pitta (Fire & Water), and Kapha (Earth & Water) govern all physical and mental processes in the body and mind."
	},
	{
		title: "Balance is Health",
		content: "Health is achieved when there is a balance between the three doshas, proper digestion, and when body, mind, and spirit are in harmony."
	}
];

export default function ImportanceScreen() {
	const navigation = useNavigation();
	const [language, setLanguage] = useState('en');

	const openDrawer = () => {
		// @ts-ignore: dispatch exists but TypeScript doesn't recognize it
		navigation.dispatch(DrawerActions.openDrawer());
	};

	const toggleLanguage = () => {
		setLanguage(language === 'en' ? 'mr' : 'en');
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../../assets/images/Ayurveda.jpg')}
				style={styles.header}
			>
				<View style={styles.headerOverlay}>
					<View style={styles.headerTop}>
						<IconButton
							icon="menu"
							iconColor="#FFFFFF"
							size={28}
							onPress={openDrawer}
							style={styles.menuButton}
						/>
						<View style={styles.translateContainer}>
							<TouchableOpacity 
								style={styles.translateWrapper}
								onPress={toggleLanguage}
							>
								<IconButton
									icon="translate"
									iconColor="#FFFFFF"
									size={24}
									style={styles.translateButton}
								/>
								<Text style={styles.translateText}>
									{language === 'en' ? 'मराठी' : 'ENG'}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<Text variant="headlineMedium" style={styles.headerTitle}>
						Importance of Ayurveda
					</Text>
					<Text style={styles.headerSubtitle}>
						Ancient Wisdom for Modern Wellness
					</Text>
				</View>
			</ImageBackground>

			<ScrollView 
				style={styles.content}
				contentContainerStyle={styles.contentContainer}
			>
				<Card style={styles.introCard}>
					<Card.Content>
						<Text style={styles.introText}>
							Ayurveda, the ancient Indian system of medicine, has been practiced for over 5000 years. It offers a comprehensive approach to healthy and balanced living.
						</Text>
					</Card.Content>
				</Card>

				{ayurvedaImportance.map((item, index) => (
					<Card key={index} style={styles.card}>
						<Card.Content>
							<View style={styles.cardHeader}>
								<MaterialCommunityIcons name="leaf" size={24} color="#D4B895" />
								<Text variant="titleMedium" style={styles.cardTitle}>
									{item.title}
								</Text>
							</View>
							<Text style={styles.cardContent}>
								{item.content}
							</Text>
						</Card.Content>
					</Card>
				))}

				<Text variant="titleLarge" style={styles.sectionTitle}>
					Fundamental Principles
				</Text>

				{principles.map((principle, index) => (
					<Card key={index} style={styles.card}>
						<Card.Content>
							<View style={styles.cardHeader}>
								<MaterialCommunityIcons name="yoga" size={24} color="#D4B895" />
								<Text variant="titleMedium" style={styles.cardTitle}>
									{principle.title}
								</Text>
							</View>
							<Text style={styles.cardContent}>
								{principle.content}
							</Text>
						</Card.Content>
					</Card>
				))}
				<View style={styles.bottomPadding} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F3F8F4',
	},
	header: {
		height: 200,
	},
	headerOverlay: {
		height: '100%',
		backgroundColor: 'rgba(11, 59, 45, 0.6)',
		padding: 16,
	},
	headerTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 8,
	},
	menuButton: {
		margin: 0,
		backgroundColor: 'rgba(11, 59, 45, 0.5)',
		borderRadius: 8,
	},
	headerTitle: {
		color: 'white',
		fontWeight: 'bold',
		marginBottom: 8,
		fontFamily: 'Poppins-Bold',
		marginTop: 'auto',
	},
	headerSubtitle: {
		color: 'white',
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
	},
	content: {
		flex: 1,
		padding: 16,
	},
	contentContainer: {
		paddingBottom: 24,
	},
	introCard: {
		marginBottom: 16,
		backgroundColor: '#0B3B2D',
		borderRadius: 12,
		elevation: 4,
	},
	introText: {
		color: 'white',
		fontSize: 16,
		lineHeight: 24,
		fontFamily: 'Poppins-Regular',
	},
	sectionTitle: {
		fontWeight: 'bold',
		marginVertical: 16,
		color: '#0B3B2D',
		fontFamily: 'Poppins-Bold',
	},
	card: {
		marginBottom: 16,
		borderRadius: 12,
		backgroundColor: '#FFFFFF',
		elevation: 4,
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
		gap: 12,
	},
	cardTitle: {
		fontFamily: 'Poppins-Bold',
		color: '#0B3B2D',
		flex: 1,
	},
	cardContent: {
		color: '#0B3B2D',
		lineHeight: 22,
		fontFamily: 'Poppins-Regular',
		opacity: 0.87,
	},
	bottomPadding: {
		height: 16,
	},
	translateContainer: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#FFFFFF',
	},
	translateWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 12,
	},
	translateButton: {
		margin: 0,
	},
	translateText: {
		color: '#FFFFFF',
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
		marginLeft: -8,
	},
}); 